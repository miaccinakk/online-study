import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { detail: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { detail: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Get contact email from environment variable
    const contactEmail = process.env.NV_CONTACT_EMAIL || "support@linguahub.app";

    // Here you would typically integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - etc.
    
    // For now, we'll log the message and return success
    // In production, replace this with actual email sending logic
    console.log("Contact form submission:", {
      to: contactEmail,
      from: email,
      name,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate successful email sending
    return NextResponse.json(
      { detail: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { detail: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
