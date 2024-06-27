import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const traceparent = req.headers.get("Traceparent")!;
  const res = await fetch("http://api:1323/hello", {
    method: "GET",
    headers: {
      "Traceparent": traceparent
    },
  })
  const result = await res.json()
  return NextResponse.json({message: result, auth: req.auth}, { status: 200 });
});
