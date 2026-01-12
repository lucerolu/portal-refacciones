//api\send-magic-link.js
//ENVIROMENT VARIABLES: RESEND_API_KEY, EMAIL_FROM, BASE_URL
//NECESARY:RESEND EN EL JSON 

import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// ⏱️ DURACIÓN DEL MAGIC LINK (20 minutos)
const MAGIC_LINK_EXPIRATION_MINUTES = 30; // 👈 CAMBIA AQUÍ

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email.endsWith("@dimasur.com.mx")) {
    return res.status(400).json({ error: "Dominio no permitido" });
  }

  // Token seguro
  const token = crypto.randomBytes(32).toString("hex");

  // Guardar token (demo simple con cookie)
  // 👉 En producción ideal usar DB o KV
  res.setHeader(
    "Set-Cookie",
    `magicToken=${token}; Max-Age=${MAGIC_LINK_EXPIRATION_MINUTES * 60}; Path=/; HttpOnly`
  );

  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/validate?token=${token}`;

  await resend.emails.send({
    from: "Portal Dimasur <portalrefacciones@dimasur.com.mx>",
    to: email,
    subject: "Acceso al portal Dimasur",
    html: `
      <p>Da clic en el siguiente enlace para acceder:</p>
      <a href="${magicLink}">${magicLink}</a>
      <p>Este enlace expira en 20 minutos.</p>
    `,
  });

  res.status(200).json({ ok: true });
}
