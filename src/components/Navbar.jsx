import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/dimasur.webp";
import navbarBg from "../assets/navbar.jpg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    window.location.reload(); // esto regresa al login
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 64, 32, 0.95) 100%),
          url(${navbarBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo Dimasur"
            className="h-10 w-auto drop-shadow-lg"
          />
        </div>

        {/* Título */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-white drop-shadow-lg font-[Poppins]">
            Portal de Refacciones
          </h1>
        </div>

        {/* Menú derecho */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white drop-shadow-md">
          <a href="/inicio" className="hover:text-blue-300 transition-colors">
            Inicio
          </a>

          <a
            href="https://dshb-dm-refacciones.streamlit.app/#resumen-general-de-compras-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors"
          >
            Dashboard
          </a>

          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={cerrarSesion}
            className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
