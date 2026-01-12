//api\validate-magic-link.js

export default function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token inválido" });
  }

  // ⚠️ Demo simple: aceptamos cualquier token válido en cookie
  const cookies = req.headers.cookie || "";

  if (!cookies.includes(`magicToken=${token}`)) {
    return res.status(401).json({ error: "Token expirado o inválido" });
  }

  // ⏱️ SESIÓN ACTIVA (1 semana)
  const SESSION_DAYS = 7; // 👈 

  res.setHeader(
    "Set-Cookie",
    `auth=true; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax; Secure`
  );

  res.status(200).json({ ok: true });
}
