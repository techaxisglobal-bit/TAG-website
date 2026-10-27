import { NextResponse } from "next/server";
import { getConsultationRecords, updateConsultationStatus, deleteConsultationRecord } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const consultations = await getConsultationRecords();
    return NextResponse.json({
      success: true,
      count: consultations.length,
      consultations
    });
  } catch (error: any) {
    console.error("[Admin API] Failed to fetch consultations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load consultations" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await updateConsultationStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Consultation record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation status updated successfully"
    });
  } catch (error: any) {
    console.error("[Admin API] Failed to update consultation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Consultation ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteConsultationRecord(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation record deleted successfully"
    });
  } catch (error: any) {
    console.error("[Admin API] Failed to delete consultation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
