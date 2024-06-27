import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { trace, context, Span } from "@opentelemetry/api";

export const GET = auth(async function GET(req) {
  if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const res = await fetch("http://api:1323/hello")
  const result = await res.json()
  return NextResponse.json({message: result, auth: req.auth}, { status: 200 });
});
