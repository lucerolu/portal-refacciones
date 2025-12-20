// portal-refacciones/src/components/EstadoCuentaPanel.jsx

import { motion } from "framer-motion";
import { ArrowLeft, PiggyBank, Folder, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import PanelLoader from "./common/PanelLoader";

export default function EstadoCuentaPanel({ onClose, panelRef }) {
  const [tree, setTree] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [loading, setLoading] = useState(true);   // ← Loader visible al abrir
  const [fallbackDone, setFallbackDone] = useState(false);

  // Cargar árbol desde el backend
  useEffect(() => {
    setLoading(true);
    setFallbackDone(false);

    const fallback = setTimeout(() => {
      console.warn("⏳ Fallback activado (API tardó demasiado)");
      setLoading(false);
      setFallbackDone(true);
    }, 6000);

    fetch("/api/drive?seccion=estadoCuenta")
      .then(res => res.json())
      .then(data => {
        setTree(data);

        // Garantizamos un mínimo de 300ms de loader elegante
        setTimeout(() => {
          if (!fallbackDone) {
            setLoading(false);
          }
        }, 300);
      })
      .catch(err => {
        console.error("❌ Error al cargar árbol:", err);
        setLoading(false);
      });

    return () => clearTimeout(fallback);
  }, []);

  // Carpeta actual
  const currentFolder = currentPath.reduce(
    (acc, folderId) => acc.find(item => item.id === folderId)?.children || [],
    tree
  );

  const goToFolder = (folderId) => setCurrentPath([...currentPath, folderId]);
  const goBackFolder = () => setCurrentPath(currentPath.slice(0, -1));
  const isRoot = currentPath.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
    >
      <motion.div
        ref={panelRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl relative max-h-[80vh] overflow-y-auto"
      >

        {/* === LOADER SOBRE TODO EL PANEL === */}
        {loading && <PanelLoader />}

        {/* Botón volver */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="text-center mt-4">
          <PiggyBank className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Estado de cuenta</h2>

          {/* Breadcrumb */}
          {!isRoot && (
            <button
              onClick={goBackFolder}
              className="mb-4 text-sm text-pink-600 underline hover:text-pink-800"
            >
              ← Regresar
            </button>
          )}

          {/* Grid dinámico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 opacity-100">
            {currentFolder.map((item) =>
              item.type === "folder" ? (
                <div
                  key={item.id}
                  onClick={() => goToFolder(item.id)}
                  className="p-6 rounded-xl bg-pink-100 hover:bg-pink-200 
                             transition shadow text-center cursor-pointer"
                >
                  <Folder className="w-8 h-8 text-pink-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg text-pink-700">
                    {item.name}
                  </h3>
                  <p className="text-pink-600 text-sm">Carpeta</p>
                </div>
              ) : (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-xl bg-pink-100 hover:bg-pink-200 
                             transition shadow text-center cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-pink-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg text-pink-700">
                    {item.name}
                  </h3>
                  <p className="text-pink-600 text-sm">Archivo</p>
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
