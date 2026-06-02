import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { env } from "@/env";

export async function GET() {
  try {
    const resources = await db.resource.findMany({
      where: {
        status: "Published",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(resources);
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verify admin password
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const subject = formData.get("subject") as string;
    const classLevel = formData.get("classLevel") as string;
    const yearStr = formData.get("year") as string;
    const year = yearStr ? parseInt(yearStr, 10) : null;
    const status = (formData.get("status") as string) || "Published";

    if (!file || !title || !category || !subject || !classLevel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      token: env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
    });

    // 4. Save metadata to database
    const resource = await db.resource.create({
      data: {
        title,
        category,
        subject,
        classLevel,
        year,
        fileName: file.name,
        fileSize: file.size,
        blobUrl: blob.url,
        status,
      },
    });

    revalidatePath("/admin/resources");
    revalidatePath("/resources");

    return NextResponse.json(resource);
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload resource" },
      { status: 500 }
    );
  }
}
