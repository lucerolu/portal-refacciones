// src/components/common/IframeWithLoader.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IframeWithLoader({ src, className }) {
  const [hideLoader, setHideLoader] = useState(false);

  // Fallback automático si Drive no dispara onLoad
  useEffect(() => {
    console.log("🔄 Nuevo src detectado:", src);
    setHideLoader(false);

    const fallback = setTimeout(() => {
      console.log("⏳ Activando fallback: mostrando contenido");
      setHideLoader(true);
    }, 1200);

    return () => clearTimeout(fallback);
  }, [src]);

  const handleLoad = () => {
    console.log("⚡ IFRAME cargó: evento onLoad detectado");
    setTimeout(() => {
      console.log("✔ Loader ocultado tras onLoad");
      setHideLoader(true);
    }, 300);
  };

  // Log cada render
  console.log("hideLoader state:", hideLoader);

  return (
    <div className="relative w-full h-full flex-1 min-h-[300px]">
      {/* <div className="relative w-full h-full flex-1 min-h-[300px] overflow-hidden"> */}
      
      <AnimatePresence>
        {!hideLoader && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center 
                      bg-white/60 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-4 border-gray-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: "linear",
              }}
            />
            <div className="mt-3 text-gray-600 font-medium tracking-wide">
              Cargando…
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <iframe
        src={src}
        title="Contenido embebido"
        onLoad={handleLoad}
        className={`w-full h-full rounded-lg border-0 ${className}`}
        loading="lazy"
        allow="fullscreen"
        style={{ pointerEvents: hideLoader ? "auto" : "none" }}
      />

    </div>
  );
}
