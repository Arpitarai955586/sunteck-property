import nodemailer from "nodemailer";

// ─── Email transporter using Gmail + App Password ───────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Send WhatsApp via CallMeBot (free service) ─────────────────────────────
async function sendWhatsApp(message) {
  const apiKey = process.env.WHATSAPP_APIKEY;
  const phone = process.env.WHATSAPP_PHONE;

  if (!apiKey || !phone) return { success: false, reason: "No WhatsApp API key configured" };

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    return { success: res.ok, response: text };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ─── Build HTML email template ────────────────────────────────────────────────
function buildEmailHTML({ name, mobile, email, source, timestamp }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .card { background: #fff; max-width: 540px; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 28px 32px; }
    .header h1 { color: #c8902d; margin: 0; font-size: 22px; letter-spacing: 0.05em; }
    .header p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .row { display: flex; border-bottom: 1px solid #f0f0f0; padding: 12px 0; }
    .row:last-child { border-bottom: none; }
    .label { color: #999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; flex-shrink: 0; padding-top: 2px; }
    .value { color: #222; font-size: 14px; font-weight: 500; }
    .badge { display: inline-block; background: #c8902d; color: white; font-size: 11px; padding: 3px 10px; border-radius: 20px; }
    .footer { background: #f8f8f8; padding: 16px 32px; border-top: 1px solid #eee; }
    .footer p { color: #aaa; font-size: 11px; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🏠 New Enquiry — Sunteck OneWorld</h1>
      <p>You have received a new lead from the website</p>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Name</span>
        <span class="value">${name}</span>
      </div>
      <div class="row">
        <span class="label">Mobile</span>
        <span class="value"><a href="tel:${mobile}" style="color:#c8902d;text-decoration:none;">📞 ${mobile}</a></span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:${email}" style="color:#c8902d;text-decoration:none;">✉️ ${email}</a></span>
      </div>
      <div class="row">
        <span class="label">Source</span>
        <span class="value"><span class="badge">${source || "Website"}</span></span>
      </div>
      <div class="row">
        <span class="label">Time</span>
        <span class="value">${timestamp}</span>
      </div>
      <div class="row">
        <span class="label">WhatsApp</span>
        <span class="value">
          <a href="https://wa.me/91${mobile}?text=${encodeURIComponent(`Hi ${name}, thank you for enquiring about Sunteck OneWorld. Our team will reach you shortly!`)}"
             style="display:inline-block;background:#25D366;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:13px;">
            💬 Reply on WhatsApp
          </a>
        </span>
      </div>
    </div>
    <div class="footer">
      <p>Sunteck OneWorld • ariptarai@gmail.com • This is an automated notification.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── API Route Handler ────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, mobile, email, source } = body;

    // Validate required fields
    if (!name || !mobile || !email) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return Response.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ── 1. Send Email Notification ────────────────────────────────────────────
    const emailResult = await transporter.sendMail({
      from: `"Sunteck OneWorld Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `🏠 New Enquiry: ${name} — Sunteck OneWorld`,
      html: buildEmailHTML({ name, mobile, email, source, timestamp }),
      text: `New Enquiry\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nSource: ${source}\nTime: ${timestamp}`,
    });

    // ── 2. Send WhatsApp Notification ─────────────────────────────────────────
    const whatsappMessage =
      `🏠 *New Enquiry - Sunteck OneWorld*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Mobile:* ${mobile}\n` +
      `✉️ *Email:* ${email}\n` +
      `📍 *Source:* ${source || "Website"}\n` +
      `🕐 *Time:* ${timestamp}`;

    const waResult = await sendWhatsApp(whatsappMessage);

    return Response.json({
      success: true,
      email: { sent: true, messageId: emailResult.messageId },
      whatsapp: waResult,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { success: false, error: "Failed to send notification. Please try again." },
      { status: 500 }
    );
  }
}
