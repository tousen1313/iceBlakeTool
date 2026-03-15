import { NextResponse } from "next/server";
import todayFacts from "@/data/today-facts.json";

export async function GET() {
  const now = new Date();
  const key = `${now.getMonth() + 1}-${now.getDate()}`;
  const entries = (todayFacts as Record<string, string[]>)[key] ?? [];
  const shuffled = [...entries].sort(() => Math.random() - 0.5).slice(0, 3);

  return NextResponse.json({ facts: shuffled });
}
