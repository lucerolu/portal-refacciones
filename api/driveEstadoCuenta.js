// /api/driveEstadoCuenta.js

import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });
    const ROOT_FOLDER = process.env.GDRIVE_ESTADO_FOLDER; // ← NUEVA VARIABLE

    const readFolder = async (folderId) => {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: "files(id, name, mimeType)",
      });

      const list = response.data.files;

      const items = await Promise.all(
        list.map(async (file) => {
          if (file.mimeType === "application/vnd.google-apps.folder") {
            return {
              id: file.id,
              name: file.name,
              type: "folder",
              children: await readFolder(file.id),
            };
          } else {
            // LINK DE DRIVE NORMAL (NO preview, no embed)
            const driveUrl = `https://drive.google.com/file/d/${file.id}/view`;

            return {
              id: file.id,
              name: file.name,
              type: "file",
              url: driveUrl,
            };
          }
        })
      );

      return items;
    };

    const tree = await readFolder(ROOT_FOLDER);
    res.status(200).json(tree);

  } catch (error) {
    console.error("Drive error:", error);
    res.status(500).json({ error: error.message });
  }
}
