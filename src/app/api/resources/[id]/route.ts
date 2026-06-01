import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { db } from "@/server/db";
import { env } from "@/env";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify admin password
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // 2. Find the resource
    const resource = await db.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // 3. Delete from Vercel Blob
    if (resource.blobUrl) {
      await del(resource.blobUrl, {
        token: env.BLOB_READ_WRITE_TOKEN,
      });
    }

    // 4. Delete from Database
    await db.resource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Find the resource to ensure it exists
    const resource = await db.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const { title, category, subject, classLevel, year, status } = body;

    const updatedResource = await db.resource.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(subject && { subject }),
        ...(classLevel && { classLevel }),
        ...(year !== undefined && { year: year === null ? null : parseInt(year, 10) }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({ success: true, resource: updatedResource });
  } catch (error) {
    console.error("Failed to update resource:", error);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}
