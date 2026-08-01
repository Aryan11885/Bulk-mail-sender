import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { sendEmail } from "@/lib/gmail";

interface Recipient {
  name: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { subject, body, recipients } = await request.json();

    const results = [];

    for (const recipient of recipients as Recipient[]) {
      try {
        const personalizedBody = body.replaceAll(
          "{{name}}",
          recipient.name || "Friend"
        );

        await sendEmail(
          session.accessToken,
          recipient.email,
          subject,
          personalizedBody
        );

        results.push({
          name: recipient.name,
          email: recipient.email,
          status: "success",
        });

        // Prevent Gmail rate-limit issues
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Failed: ${recipient.email}`, error);

        results.push({
          name: recipient.name,
          email: recipient.email,
          status: "failed",
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      sent: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to send emails",
      },
      {
        status: 500,
      }
    );
  }
}