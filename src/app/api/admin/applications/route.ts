import { NextResponse } from "next/server";
import { getApplicationRecords } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const applications = await getApplicationRecords();
    return NextResponse.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error: any) {
    console.error("[Admin API] Failed to fetch applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load job applications" },
      { status: 500 }
    );
  }
}
