//api\validate-magic-link.js

export default function handler(req, res) {
  const { token } = req.query;

  const record = global.magicLinks?.get(token);

  if (!record) {
    return res.status(401).json({ error: "Token inválido" });
  }

  if (Date.now() > record.expires) {
    global.magicLinks.delete(token);
    return res.status(401).json({ error: "Token expirado" });
  }

  // 🧹 Se usa una sola vez
  global.magicLinks.delete(token);

  const SESSION_DAYS = 7;

  res.setHeader(
    "Set-Cookie",
    `auth=true; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax; Secure`
  );

  res.status(200).json({ ok: true });
}
