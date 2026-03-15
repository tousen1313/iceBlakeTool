import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const entry = {
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  await redis.lpush("question-requests", JSON.stringify(entry));

  return NextResponse.json({ ok: true });
}
