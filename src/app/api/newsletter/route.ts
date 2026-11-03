import { NextResponse } from "next/server";
import { validateNewsletterPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Malformed JSON request body." },
        { status: 400 }
      );
    }

    const validation = validateNewsletterPayload(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { message: validation.error || "Invalid email address." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Subscribed successfully! Thank you for joining.",
        subscriber: {
          email: validation.data.email,
          subscribedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Subscription failed";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
