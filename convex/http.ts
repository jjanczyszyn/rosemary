import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

// Where inquiries are delivered, and the verified Resend sender.
const TO_EMAIL = "hello@justinalydia.com";
const FROM_EMAIL = "Rosemary Dream <rosemary@popoyo.co>";

const INTEREST_LABELS: Record<string, string> = {
  "investor-deck": "Receiving the Investor Deck",
  "virtual-tour": "Booking a Virtual Tour",
  "in-person-visit": "Planning an In-Person Visit",
  "village-season": "Learning About the Village Season",
  other: "Something Else",
};

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;",
  );
}

const sendInquiry = httpAction(async (_ctx, request) => {
  let payload: {
    name?: string;
    email?: string;
    interest?: string;
    message?: string;
  };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  const name = (payload.name ?? "").toString().trim();
  const email = (payload.email ?? "").toString().trim();
  const interest = (payload.interest ?? "").toString();
  const message = (payload.message ?? "").toString().trim();

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Name and a valid email are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      },
    );
  }

  const interestLabel = INTEREST_LABELS[interest] ?? interest ?? "—";
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interested in: ${interestLabel}`,
    "",
    message ? `Message:\n${message}` : "Message: (none)",
  ];

  const html = `
    <h2>New Rosemary Dream inquiry</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Interested in:</strong> ${esc(interestLabel)}</p>
    <p><strong>Message:</strong><br/>${message ? esc(message).replace(/\n/g, "<br/>") : "(none)"}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Email not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Rosemary Dream inquiry — ${name}`,
      text: lines.join("\n"),
      html,
    }),
  });

  if (!resendRes.ok) {
    const detail = await resendRes.text();
    console.error("Resend send failed", resendRes.status, detail);
    return new Response(JSON.stringify({ error: "Failed to send" }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
});

const http = httpRouter();

http.route({ path: "/sendInquiry", method: "POST", handler: sendInquiry });
http.route({
  path: "/sendInquiry",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: corsHeaders() })),
});

export default http;
