import { motion } from "framer-motion";
import { ArrowLeft, PiggyBank } from "lucide-react";

export default function EstadoCuentaPanel({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl relative"
      >
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

          {/* BOTONES INTERNOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Opción 1 */}
            <a
              href="https://drive.google.com/drive/folders/1RrO8Rnyf55vHRxxhQfbW5Vknus9abtHq?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-pink-100 hover:bg-pink-200 transition shadow text-center cursor-pointer"
            >
              <h3 className="font-semibold text-lg text-pink-700">Intereses y débitos</h3>
              <p className="text-pink-600 text-sm">Por sucursal</p>
            </a>

            {/* PRÓXIMAS OPCIONES */}
            <div className="p-6 rounded-xl bg-gray-100 text-gray-400 shadow text-center cursor-not-allowed">
              <h3 className="font-semibold text-lg">Más módulos próximamente</h3>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
