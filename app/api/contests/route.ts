import { NextResponse } from "next/server";
import { fetchCodeChefContests } from "@/lib/fetchALl";

export async function GET() {
  try {
    const contests = await fetchCodeChefContests();
    return NextResponse.json({ ok: true, contests });
  } catch (error) {
    console.error('Error fetching contests from CodeChef API:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
