//src\components\common\PanelLoader.jsx
import { motion } from "framer-motion";

export default function PanelLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center 
                    bg-white/70 backdrop-blur-sm z-[9999]">

      <motion.div
        className="w-14 h-14 rounded-full border-4 border-gray-400 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      <div className="mt-3 text-gray-700 font-semibold tracking-wide text-sm">
        Cargando contenido…
      </div>
    </div>
  );
}
