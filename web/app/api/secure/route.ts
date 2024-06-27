import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { trace, context, Span } from "@opentelemetry/api";

export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth);

  const currentContext = context.active();
  const tracer = trace.getTracer("next-app");
  const span = tracer.startSpan(__filename);
  console.error({
    traceId: span.spanContext().traceId,
    spanId: span.spanContext().spanId,
    Body: {
      message: "Not authenticated",
    },
  });
  span.end();

  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
