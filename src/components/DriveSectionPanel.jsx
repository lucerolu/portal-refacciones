//src\components\DriveSectionPanel.jsx

import { useState, useEffect } from "react";
import MultiLevelDrawer from "./MultiLevelDrawer";
import MultiLevelMenu from "./MultiLevelMenu";
import GenericPanel from "./GenericPanel";
import IframeWithLoader from "./common/IframeWithLoader";
import PanelLoader from "./common/PanelLoader";

/**
 * Panel genérico para secciones basadas en Drive
 *
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - seccion: string (llantas, boletines, etc.)
 * - leftTitle: string
 * - emptyTitle: string ("Selecciona una categoría ...")
 */
export default function DriveSectionPanel({
  isOpen,
  onClose,
  seccion,
  leftTitle,
  emptyTitle,
}) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [openPanelItem, setOpenPanelItem] = useState(null);
  const [driveData, setDriveData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loadingStructure, setLoadingStructure] = useState(true);

  /* ===============================
     Carga estructura Drive
  =============================== */
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setLoadingStructure(true);
        setActiveSubmenu(null);   // 🔴 IMPORTANTE: reset limpio
        setSelectedNode(null);

        const res = await fetch(`/api/drive?seccion=${seccion}`);
        const json = await res.json();

        const adaptTree = (nodes) =>
          nodes.map((n) => ({
            id: n.id,
            label: n.name || "Sin nombre",
            type: n.type === "file" ? "url" : "folder",
            url: n.url || null,
            children: n.children ? adaptTree(n.children) : [],
          }));

        setDriveData(adaptTree(json));
      } catch (err) {
        console.error(`Error loading sección ${seccion}:`, err);
      } finally {
        setLoadingStructure(false);
      }
    };

    fetchData();
  }, [isOpen, seccion]);

  /* ===============================
     Datos derivados
  =============================== */
  const rightItems = activeSubmenu
    ? driveData.find((n) => n.id === activeSubmenu)?.children || []
    : [];

  /* ===============================
     Render
  =============================== */
  return (
    <>
      <MultiLevelDrawer isOpen={isOpen} onClose={onClose}>
        <div className="bg-white rounded-2xl shadow p-4 flex h-[75vh] w-full overflow-x-auto min-h-0">
          {loadingStructure && <PanelLoader />}

          {/* ===== Panel izquierdo ===== */}
          <div className="w-64 border-r p-4 flex flex-col gap-4">
            <h3 className="font-semibold">{leftTitle}</h3>

            <div className="flex-1 overflow-auto h-full">
              {driveData.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setActiveSubmenu(n.id);
                    setSelectedNode(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSubmenu === n.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <button
              className="text-sm text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>

          {/* ===== Panel derecho ===== */}
          <div className="flex-1 p-4 flex flex-col min-h-0">
            <h3 className="font-semibold mb-2">
              {activeSubmenu
                ? driveData.find((n) => n.id === activeSubmenu)?.label
                : emptyTitle}
            </h3>

            <div className="flex-1 flex border rounded-md overflow-hidden min-h-0">
              {/* Árbol */}
              <div className="w-1/2 border-r p-3">
                <MultiLevelMenu
                  data={activeSubmenu ? rightItems : []}
                  onOpenPanel={setOpenPanelItem}
                  onSelectItem={setSelectedNode}
                />
              </div>

              {/* Preview */}
              <div className="flex-1 p-3 overflow-auto h-full min-h-[300px]">
                {!selectedNode ? (
                  <p className="text-gray-500">
                    Selecciona un archivo para previsualizarlo.
                  </p>
                ) : selectedNode.type === "folder" ? (
                  <p className="text-gray-500">Carpeta seleccionada.</p>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md mb-3">
                      <h4 className="font-semibold text-sm">
                        {selectedNode.label}
                      </h4>

                      {selectedNode.url && (
                        <a
                          href={selectedNode.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                        >
                          Abrir en Drive
                        </a>
                      )}
                    </div>

                    <IframeWithLoader
                      src={selectedNode.url}
                      className="flex-1 w-full border rounded-md"
                      allow="fullscreen"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MultiLevelDrawer>

      {/* Panel secundario (opcional) */}
      <GenericPanel
        isOpen={!!openPanelItem}
        onClose={() => setOpenPanelItem(null)}
        title={openPanelItem?.label || "Detalle"}
      />
    </>
  );
}
