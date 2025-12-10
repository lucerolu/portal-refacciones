import { useState, useEffect } from "react";
import MultiLevelDrawer from "./MultiLevelDrawer";
import MultiLevelMenu from "./MultiLevelMenu";
import GenericPanel from "./GenericPanel";
import IframeWithLoader from "./common/IframeWithLoader";
import PanelLoader from "./common/PanelLoader";

export default function CapacitacionPanel({ isOpen, onClose }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [openPanelItem, setOpenPanelItem] = useState(null);
  const [driveData, setDriveData] = useState([]);  
  const [selectedNode, setSelectedNode] = useState(null);
  const [loadingStructure, setLoadingStructure] = useState(true);

  // Cargar Drive Capacitacion
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/driveCapacitacion");
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
        console.error("Error loading capacitación:", err);
      }finally{
        setLoadingStructure(false);
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
          {/* Panel izquierdo */}
          <div className="w-64 border-r p-4 flex flex-col gap-4">
            <h3 className="font-semibold">Categorías</h3>

            <div className="flex-1 overflow-auto h-full">
              {leftMenuData.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveSubmenu(n.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSubmenu === n.id ? "bg-pink-50" : "hover:bg-gray-100"
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

          {/* Panel derecho */}
          <div className="flex-1 p-4 flex flex-col min-h-0">
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

              {/* Vista previa */}
              <div className="flex-1 p-3 overflow-auto h-full min-h-[300px]">
                {!selectedNode ? (
                  <p className="text-gray-500">
                    Selecciona un documento, video o presentación.
                  </p>
                ) : (
                  <div className="flex flex-col h-full">

                    {/* Barra superior */}
                    <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md mb-3">
                      <h4 className="font-semibold text-sm">{selectedNode.label}</h4>

                      {selectedNode.url && (
                        <a
                          href={selectedNode.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-600 text-white text-xs px-3 py-1 rounded-md"
                        >
                          Abrir en Drive
                        </a>
                      )}
                    </div>

                    {/* Previsualización */}
                    {selectedNode.type === "folder" ? (
                      <p className="text-gray-500">Carpeta seleccionada.</p>
                    ) : (
                      <IframeWithLoader
                        src={selectedNode.url}
                        className="flex-1 w-full border rounded-md"
                        allow="fullscreen"
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
          Panel adicional para capacitación (si lo llegas a usar después).
        </p>
      </GenericPanel>
    </>
  );
}
