import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";

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

    const validation = validateContactPayload(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          message: validation.error || "Invalid form submission.",
          fieldErrors: validation.fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully",
        submission: {
          ...validation.data,
          receivedAt: new Date().toISOString(),
          recipient: "prashantbikramsingh88@gmail.com",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send message";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
