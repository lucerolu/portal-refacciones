//api\send-magic-link.js
//ENVIROMENT VARIABLES: RESEND_API_KEY, EMAIL_FROM, BASE_URL
//NECESARY:RESEND EN EL JSON 

import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔐 Almacén temporal
global.magicLinks = global.magicLinks || new Map();

const MAGIC_LINK_MINUTES = 20;

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email.endsWith("@dimasur.com.mx")) {
    return res.status(400).json({ error: "Dominio no permitido" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  global.magicLinks.set(token, {
    email,
    expires: Date.now() + MAGIC_LINK_MINUTES * 60 * 1000,
  });

  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/validate?token=${token}`;

  await resend.emails.send({
    from: "Portal Dimasur <portalrefacciones@dimasur.com.mx>",
    to: email,
    subject: "Acceso al portal Dimasur",
    html: `
      <p>Tu acceso está listo:</p>
      <a href="${magicLink}">Acceder al portal</a>
      <p>Este enlace expira en 20 minutos.</p>
    `,
  });

  res.status(200).json({ ok: true });
}
