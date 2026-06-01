import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/server/db";
import { Msg91Service } from "@/server/msg91";

// Hardcoded notification target
const NOTIFY_EMAIL = "talhaansari1606@gmail.com";
const TEMPLATE_ID = "scholar_bot_lead_notification"; // Replace with actual Msg91 template ID

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  classLevel: z.enum(["Class 11", "Class 12", "Dropper", "11th Grade", "12th Grade"], {
    errorMap: () => ({ message: "Class must be 'Class 11', 'Class 12', or 'Dropper'" }),
  }),
  phone: z.string().optional(),
  goal: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const { name, email, classLevel, phone, goal } = parsed.data;

    // Map frontend classLevel if needed
    const normalizedClass = classLevel === "11th Grade" ? "Class 11" 
                          : classLevel === "12th Grade" ? "Class 12" 
                          : classLevel;

    // Upsert: create if new, update name/class if email already exists
    const lead = await db.chatLead.upsert({
      where: { email },
      create: { name, email, classLevel: normalizedClass, phone, goal },
      update: { name, classLevel: normalizedClass, ...(phone && { phone }), ...(goal && { goal }) },
    });

    // Send notification email (fire-and-forget, don't block the response)
    if (Msg91Service.isConfigured()) {
      Msg91Service.sendTemplateEmail({
        toEmail: NOTIFY_EMAIL,
        toName: "Destiny 4 NEET",
        templateId: TEMPLATE_ID,
        variables: {
          student_name: name,
          student_email: email,
          student_class: classLevel,
          student_phone: phone || "Not provided",
          student_message: goal || "Not provided",
          submitted_at: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        },
      }).catch((err) => {
        console.error("[ChatLead] Failed to send notification email:", err);
      });
    } else {
      console.warn(
        "[ChatLead] MSG91 not configured – skipping email notification",
      );
    }

    return NextResponse.json({
      success: true,
      isNew: lead.createdAt.getTime() === lead.updatedAt.getTime(),
    });
  } catch (error) {
    console.error("[ChatLead] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
