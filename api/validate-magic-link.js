//api\validate-magic-link.js

import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token faltante" });
  }

  try {
    jwt.verify(token, process.env.MAGIC_LINK_SECRET);

    const SESSION_DAYS = 7;

    res.setHeader(
      "Set-Cookie",
      `auth=true; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax; Secure`
    );

    res.status(200).json({ ok: true });
  } catch {
    res.status(401).json({ error: "Token expirado o inválido" });
  }
}
