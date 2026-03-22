import { NextResponse } from "next/server";
import todayFacts from "@/data/today-facts.json";
import { shuffle } from "@/lib/shuffle";

export async function GET() {
  const now = new Date();
  const key = `${now.getMonth() + 1}-${now.getDate()}`;
  const entries = (todayFacts as Record<string, string[]>)[key] ?? [];
  const picked = shuffle(entries).slice(0, 3);

  return NextResponse.json({ facts: picked });
}
