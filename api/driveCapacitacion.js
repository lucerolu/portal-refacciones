// /api/driveCapacitacion.js
import { google } from "googleapis";

const folderId = process.env.CAPACITACION_FOLDER_ID; 
// 🔥 exporta en tu .env la carpeta raíz de capacitación

async function listFiles(auth, parentId) {
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'${parentId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
  });

  return res.data.files;
}

async function buildTree(auth, parentId) {
  const items = await listFiles(auth, parentId);
  const tree = [];

  for (const f of items) {
    const isFolder = f.mimeType === "application/vnd.google-apps.folder";

    tree.push({
      id: f.id,
      name: f.name,
      type: isFolder ? "folder" : "file",
      url: !isFolder
        ? `https://drive.google.com/file/d/${f.id}/preview`
        : null,
      children: isFolder ? await buildTree(auth, f.id) : [],
    });
  }

  return tree;
}

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const tree = await buildTree(auth, folderId);

    res.status(200).json(tree);
  } catch (err) {
    console.error("driveCapacitacion error:", err);
    res.status(500).json({ error: "Error loading capacitación." });
  }
}
