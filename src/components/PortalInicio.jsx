import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, FileText, ChevronDown, PiggyBank, Video, ShoppingCart, BadgePercent } from "lucide-react";
import Navbar from "./Navbar";
import ConstelacionesFondo from "./ConstelacionesFondo";
import EstadoCuentaPanel from "./EstadoCuentaPanel";

// Lista de sucursales con URLs
const sucursales = [
  { nombre: "Acayucan", url: "https://docs.google.com/spreadsheets/d/13UHVPsiI7MejlVLFA1jePD_bgZ6T9FhwmB7bRVZnTrI/edit?usp=sharing" },
  { nombre: "Campeche", url: "https://docs.google.com/spreadsheets/d/15cN90A8jig7pit9ZalubhWM0wfSSXN1Udsjc9BSALrI/edit?usp=sharing" },
  { nombre: "Cancun", url: "https://docs.google.com/spreadsheets/d/1KXLgaNAg0Jp6IGG0YLZZLu-b-Hd5cZ2GcgNEZEJh8tE/edit?usp=sharing" },
  { nombre: "Chetumal", url: "https://docs.google.com/spreadsheets/d/1sP2AmsY1neNtgKcpI60UH03dVZpbhK3xOdBqYmZU6F8/edit?usp=sharing" },
  { nombre: "Comitan", url: "https://docs.google.com/spreadsheets/d/1B9nUT5kDhhcNQdUeGhNo96cZg6RhyJNZs-BraKUkc3k/edit?usp=sharing" },
  { nombre: "Isla", url: "https://docs.google.com/spreadsheets/d/1xqDNrrRSCfxGSoytnmRhD8HdEoTMTDG_NXkzpIi8JkE/edit?usp=sharing" },
  { nombre: "Merida", url: "https://docs.google.com/spreadsheets/d/1-oqJNdE_Fdpxveel6LgH3fuFo-OgDd0ot3AnrYlnZyc/edit?usp=sharing" },
  { nombre: "Puebla", url: "https://docs.google.com/spreadsheets/d/16oAlX4oqepUbdutQpChEt5RbMzJ8c_uOEUcRPhyePeE/edit?usp=sharing" },
  { nombre: "Tapachula", url: "https://docs.google.com/spreadsheets/d/1HpevkdoZqi3H8GAe6HJw5KpQNHIyI_hy2HGGxgfXRRM/edit?usp=sharing" },
  { nombre: "Tierra blanca", url: "https://docs.google.com/spreadsheets/d/1k-JlkvOJ9hemos7Sdsk1-IHa6OaB5ax-JxTO_5_T7so/edit?usp=sharing" },
  { nombre: "Tizimin", url: "https://docs.google.com/spreadsheets/d/18a8sSJRC260-AKXbH22pI9WwFATh-oGwtOg_4QaxUYE/edit?usp=sharing" },
  { nombre: "Tuxtepec", url: "https://docs.google.com/spreadsheets/d/1DlePgvlI3ruGxmidITMjyMKlcxzLXKT3yXD4-NApx2Y/edit?usp=sharing" },
  { nombre: "Tuxtla Gtz", url: "https://docs.google.com/spreadsheets/d/1rgnyUwWmhmSc8trMzvGqvSWHzMI375ZKZjdL3T3WSE4/edit?usp=sharing" },
  { nombre: "Veracruz", url: "https://docs.google.com/spreadsheets/d/1k7u7jBRqq8fhQ4dR92DgEmyyvnvx5BO8vZlsp-PVEXg/edit?usp=sharing" },
  { nombre: "Villahermosa", url: "https://docs.google.com/spreadsheets/d/1QMGvVzOxtQiVEpdhYnoOyjQwDqlM2P54yKd6eeQSAsk/edit?usp=sharing" },
  { nombre: "Zapata", url: "https://docs.google.com/spreadsheets/d/1MiGMmvPkMGk6ladmFSQZ5SwaKg0oYIdffoin5yA4HBc/edit?usp=sharing" },
];

export default function PortalInicio() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [estadoCuentaAbierto, setEstadoCuentaAbierto] = useState(false);
  const menuRef = useRef(null); // referencia al menú

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-8 overflow-hidden z-10">
      <ConstelacionesFondo />
      <Navbar />

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full z-20 relative items-stretch auto-rows-fr">
        {/* Tarjeta 1 - Dashboard */}
        <motion.a
          href="https://dshb-dm-refacciones.streamlit.app/#resumen-general-de-compras-2025"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-blue-900 h-full"
        >
          <BarChart3 className="w-10 h-10 text-green-600 mb-4 group-hover:text-white" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
            Dashboard
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Visualiza las estadísticas de compras, estado de cuenta y ligues.
          </p>
        </motion.a>

        {/* Tarjeta 2 - Ligues */}
        <div ref={menuRef} className="relative h-full flex">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuAbierto(!menuAbierto);
            }}
            className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-yellow-500 cursor-pointer h-full w-full"
          >
            <FileText className="w-10 h-10 text-blue-600 mb-4 group-hover:text-white transition-colors" />
            <h2 className="text-xl font-semibold mb-2 group-hover:text-white">Ligues</h2>
            <p className="text-gray-600 text-sm group-hover:text-gray-200">
              Accede a los documentos de ligues por sucursal.
            </p>
            <ChevronDown
              className={`w-5 h-5 mt-3 text-gray-600 group-hover:text-white transition-transform ${
                menuAbierto ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          {/* Menú desplegable animado */}
          <AnimatePresence>
            {menuAbierto && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-1 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl p-4 w-full z-50 text-left max-h-72 overflow-y-auto"
              >
                {sucursales.map((sucursal, i) => (
                  <a
                    key={i}
                    href={sucursal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-800 py-1.5 px-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    {sucursal.nombre}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tarjeta 3 - Estado de cuenta */}
        <motion.div
          whileHover={{ scale: !estadoCuentaAbierto ? 1.05 : 1, y: !estadoCuentaAbierto ? -5 : 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setEstadoCuentaAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-pink-500 cursor-pointer h-full"
        >
          <PiggyBank className="w-10 h-10 text-pink-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Estado de cuenta
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Consulta los movimientos y pagos registrados por sucursal.
          </p>
        </motion.div>

        {/* Tarjeta 4 - Capacitación */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-orange-500 cursor-pointer h-full"
        >
          <Video className="w-10 h-10 text-green-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Capacitación
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Accede a videos y material de capacitación.
          </p>
        </motion.a>

        {/* Tarjeta 5 - Compras a proveedores externos */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-purple-600 cursor-pointer h-full"
        >
          <ShoppingCart className="w-10 h-10 text-purple-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Compras a proveedores externos
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Seguimiento
          </p>
        </motion.a>

        {/* Tarjeta 6 - Bonificaciones */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-teal-600 cursor-pointer h-full"
        >
          <BadgePercent className="w-10 h-10 text-teal-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Bonificaciones
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Seguimiento de bonificaciones por sucursal
          </p>
        </motion.a>

      </div>

      <AnimatePresence>
        {estadoCuentaAbierto && (
          <EstadoCuentaPanel onClose={() => setEstadoCuentaAbierto(false)} />
        )}
      </AnimatePresence>

              

    </div>
  );
}
