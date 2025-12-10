// src/components/ManualesPanel.jsx
import { useState, useEffect } from "react";
import MultiLevelDrawer from "./MultiLevelDrawer";
import MultiLevelMenu from "./MultiLevelMenu";
import GenericPanel from "./GenericPanel";
import IframeWithLoader from "./common/IframeWithLoader";
import PanelLoader from "./common/PanelLoader";

export default function ManualesPanel({ isOpen, onClose }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [openPanelItem, setOpenPanelItem] = useState(null);
  const [driveData, setDriveData] = useState([]);  // ← AQUÍ GUARDAMOS GOOGLE DRIVE
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingStructure, setLoadingStructure] = useState(true);

  // Cargar datos del backend
  useEffect(() => {
    if (!isOpen) return; // para que no cargue cuando no está abierto

    const fetchData = async () => {
      try {
        setLoadingStructure(true);
        const res = await fetch("/api/drive");
        const json = await res.json();

        // adaptamos un poquitito para usar tu estructura actual:
        // convierte structure Drive → structure Frontend
        const adaptTree = (nodes) => {
          return nodes.map((n) => ({
            id: n.id,
            label: n.name || "Sin nombre",
            type: n.type === "file" ? "url" : "folder",
            url: n.url || null,
            children: n.children ? adaptTree(n.children) : [],
          }));
        };

        setDriveData(adaptTree(json));
      } catch (err) {
        console.error("Error loading drive:", err);
      } finally {
        setLoadingStructure(false); // 👈 Oculta loader al terminar
      }
    };

    fetchData();
  }, [isOpen]);

  const leftMenuData = driveData;

  const rightItems = (() => {
    if (!activeSubmenu) return [];
    const node = leftMenuData.find((n) => n.id === activeSubmenu);
    return node?.children || [];
  })();

  const handleOpenPanel = (item) => setOpenPanelItem(item);

  return (
    <>
      <MultiLevelDrawer isOpen={isOpen} onClose={onClose}>
        <div className="bg-white rounded-2xl shadow p-4 flex h-[75vh] w-full overflow-x-auto min-h-0">
          {loadingStructure && <PanelLoader />}
          {/* izquierda */}
          <div className="w-64 border-r p-4 flex flex-col gap-4">
            <h3 className="font-semibold">Categorías</h3>

            <div className="flex-1 overflow-auto h-full">
              {leftMenuData.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveSubmenu(n.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSubmenu === n.id ? "bg-green-50" : "hover:bg-gray-100"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <button className="text-sm text-gray-600" onClick={onClose}>
              Cerrar
            </button>
          </div>

          {/* derecha */}
          <div className="flex-1 p-4 flex flex-col min-h-0">
            {console.log("selectedNode:", selectedNode)}
            <h3 className="font-semibold mb-2">
              {activeSubmenu
                ? leftMenuData.find((n) => n.id === activeSubmenu)?.label
                : "Selecciona una categoría"}
            </h3>

            <div className="flex-1 flex border rounded-md overflow-hidden min-h-0">
              <div className="w-1/2 border-r p-3">
                <MultiLevelMenu
                  data={activeSubmenu ? rightItems : []}
                  onOpenPanel={handleOpenPanel}
                  onSelectItem={setSelectedNode}
                />
              </div>

              <div className="flex-1 p-3 overflow-auto h-full min-h-[300px]">
                {!selectedNode ? (
                <p className="text-gray-500">Selecciona un documento o carpeta.</p>
              ) : (
                <div className="flex flex-col h-full">

                  {/* 🔥 Barra superior */}
                  <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md mb-3">
                    <h4 className="font-semibold text-sm">{selectedNode.label}</h4>

                    {selectedNode.url && (
                      <a
                        href={selectedNode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white text-xs px-3 py-1 rounded-md"
                      >
                        Abrir en Drive
                      </a>
                    )}
                  </div>

                  {/* 🔥 Vista previa */}
                  {selectedNode.type === "folder" ? (
                    <p className="text-gray-500">Carpeta seleccionada.</p>
                  ) : (
                    <IframeWithLoader
                      src={selectedNode.url}
                      className="flex-1 w-full border rounded-md"
                      //allow="fullscreen"
                    />
                  )}
                </div>
              )}

              </div>
            </div>
          </div>
        </div>
      </MultiLevelDrawer>

      <GenericPanel
        isOpen={!!openPanelItem}
        onClose={() => setOpenPanelItem(null)}
        title={openPanelItem?.name || "Detalle"}
      >
        <p className="text-sm text-gray-600">
          Este panel se usa solo para contenido tipo “panel”, pero Drive no usa eso aún.
        </p>
      </GenericPanel>
    </>
  );
}
