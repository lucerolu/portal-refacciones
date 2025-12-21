import { google } from "googleapis";

const SECCIONES = {
  manuales: {
    folderEnv: "GDRIVE_ROOT_FOLDER",
    linkType: "preview",
  },
  boletines: {
    folderEnv: "BOLETINES_FOLDER_ID",
    linkType: "preview",
  },
  cana: {
    folderEnv: "CANA_FOLDER_ID",
    linkType: "preview",
  },
  capacitacion: {
    folderEnv: "CAPACITACION_FOLDER_ID",
    linkType: "preview",
  },
  estadoCuenta: {
    folderEnv: "GDRIVE_ESTADO_FOLDER",
    linkType: "view",
  },
  almacenes: {
    folderEnv: "GESTION_ALMACENES_FOLDER_ID",
    linkType: "preview",
  },
  inventarios: {
    folderEnv: "INVENTARIOS_FOLDER_ID",
    linkType: "preview",
  },
  llantas: {
    folderEnv: "LLANTAS_FOLDER_ID",
    linkType: "preview",
  },
  marketing: {
    folderEnv: "MARKETING_FOLDER_ID",
    linkType: "preview",
  },
  material: {
    folderEnv: "MATERIAL_FOLDER_ID",
    linkType: "preview",
  },
  presupuestos: {
    folderEnv: "PRESUPUESTOS_FOLDER_ID",
    linkType: "preview",
  },
  procesos: {
    folderEnv: "PROCESOS_FOLDER_ID",
    linkType: "preview",
  },
  videos: {
    folderEnv: "VIDEOS_FOLDER_ID",
    linkType: "preview",
  },
};

export default async function handler(req, res) {
  try {
    const { seccion } = req.query;

    if (!seccion || !SECCIONES[seccion]) {
      return res.status(400).json({
        error: "Sección inválida o no especificada",
      });
    }

    const { folderEnv, linkType } = SECCIONES[seccion];
    const ROOT_FOLDER = process.env[folderEnv];

    if (!ROOT_FOLDER) {
      return res.status(500).json({
        error: `No está definida la variable de entorno ${folderEnv}`,
      });
    }

    const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const readFolder = async (folderId) => {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: "files(id, name, mimeType)",
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const items = await Promise.all(
        response.data.files.map(async (file) => {
          if (file.mimeType === "application/vnd.google-apps.folder") {
            return {
              id: file.id,
              name: file.name,
              type: "folder",
              children: await readFolder(file.id),
            };
          }

          const url =
            linkType === "view"
              ? `https://drive.google.com/file/d/${file.id}/view`
              : `https://drive.google.com/file/d/${file.id}/preview`;

          return {
            id: file.id,
            name: file.name,
            type: "file",
            url,
          };
        })
      );

      return items;
    };

    const tree = await readFolder(ROOT_FOLDER);
    res.status(200).json(tree);

  } catch (error) {
    console.error("Drive unified error:", error);
    res.status(500).json({ error: error.message });
  }
}
