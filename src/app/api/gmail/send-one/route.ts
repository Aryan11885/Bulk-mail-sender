import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { sendEmail } from "@/lib/gmail";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { to, subject, html } = await request.json();

    await sendEmail(
      session.accessToken,
      to,
      subject,
      html
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}