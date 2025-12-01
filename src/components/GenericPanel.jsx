// src/components/GenericPanel.jsx
import { motion } from "framer-motion";
import MultiLevelDrawer from "./MultiLevelDrawer";

export default function GenericPanel({ isOpen, onClose, title, children }) {
  return (
    <MultiLevelDrawer isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">Cerrar</button>
        </div>

        <div className="max-h-[60vh] overflow-auto">
          {children}
        </div>
      </div>
    </MultiLevelDrawer>
  );
}
