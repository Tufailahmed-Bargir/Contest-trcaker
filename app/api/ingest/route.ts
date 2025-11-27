import { NextResponse } from "next/server";
import { fetchAndStoreCodeChefContests } from "@/lib/fetchALl";

export async function POST() {
  try {
    await fetchAndStoreCodeChefContests();
    return NextResponse.json({ ok: true, message: "Ingestion finished" });
  } catch (error) {
    console.error("Ingest route error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
