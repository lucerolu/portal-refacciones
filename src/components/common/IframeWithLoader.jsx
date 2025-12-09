// src/components/common/IframeWithLoader.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IframeWithLoader({ src, className }) {
  const [hideLoader, setHideLoader] = useState(false);

  // 🔥 fallback automático (Drive no envía onLoad)
  useEffect(() => {
    setHideLoader(false); // cada vez que cambia el src

    const fallback = setTimeout(() => {
      setHideLoader(true);
    }, 1200); // 1.2s mínimo

    return () => clearTimeout(fallback);
  }, [src]);

  const handleLoad = () => {
    // 🔥 si Drive sí dispara el evento (a veces), quitamos el loader antes
    setTimeout(() => setHideLoader(true), 300);
  };

  return (
    <div className="relative w-full h-full flex-1">
      <AnimatePresence>
        {!hideLoader && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-20"
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
                ease: "linear"
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
        onLoad={handleLoad}
        className={`w-full h-full rounded-lg border-0 ${className}`}
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  );
}
