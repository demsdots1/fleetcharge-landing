import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

interface EarlyAccessPayload {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  fleetSize?: string;
  evShare?: string;
  message?: string;
}

export async function POST(request: Request) {
  let payload: EarlyAccessPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  // Minimal email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("early_access_leads").insert({
      name,
      email,
      company: payload.company?.trim() || null,
      role: payload.role || null,
      fleet_size: payload.fleetSize || null,
      ev_share: payload.evShare || null,
      message: payload.message?.trim() || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          error: "Failed to save submission",
          detail: error.message,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Early access route error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Server misconfiguration", detail: message },
      { status: 500 }
    );
  }
}
