import { useState, useRef, useEffect } from "react";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  FileText, 
  ChevronDown, 
  //PiggyBank, 
  Video, 
  //ShoppingCart, 
  BadgePercent, 
  Library, 
  Boxes, 
  ClipboardList, 
  Megaphone, 
  BookOpenText, 
  Building2, 
  ListChecks, 
  PackageSearch,
  Videotape,
  CoinsIcon,
  CircleDot,
  Sprout
} from "lucide-react";
import Navbar from "./Navbar";
import ConstelacionesFondo from "./ConstelacionesFondo";
{/*
import EstadoCuentaPanel from "./EstadoCuentaPanel";
import ManualesPanel from "./ManualesPanel";
import CapacitacionPanel from "./CapacitacionPanel";
import VideosPanel from "./VideosPanel";
import GestionAlmacenesPanel from "./GestionAlmacenesPanel";
import PresupuestosPanel from "./PresupuestosPanel";
import BoletinesPanel from "./BoletinesPanel";
import MarketingPanel from "./MarketingPanel";
import InventariosPanel from "./InventariosPanel";
import ProcesosPanel from "./ProcesosPanel";
import CuentasPanel from "./CuentasPanel"; 
*/}
const EstadoCuentaPanel = lazy(() => import("./EstadoCuentaPanel"));
const ManualesPanel = lazy(() => import("./ManualesPanel"));
const CapacitacionPanel = lazy(() => import("./CapacitacionPanel"));
const VideosPanel = lazy(() => import("./VideosPanel"));
const GestionAlmacenesPanel = lazy(() => import("./GestionAlmacenesPanel"));
const PresupuestosPanel = lazy(() => import("./PresupuestosPanel"));
const BoletinesPanel = lazy(() => import("./BoletinesPanel"));
const MarketingPanel = lazy(() => import("./MarketingPanel"));
const InventariosPanel = lazy(() => import("./InventariosPanel"));
const ProcesosPanel = lazy(() => import("./ProcesosPanel"));
const CuentasPanel = lazy(() => import("./CuentasPanel"));
const LlantasPanel = lazy(() => import("./LlantasPanel"));
const CanaPanel = lazy(() => import("./CanaPanel"));


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

const sucursalesBonificaciones = [
  { nombre: "Acayucan", url: "https://docs.google.com/spreadsheets/d/1eVUFgTjYDobDFi4kPzoQu3p9m6z5DZMjjIwOh99FlDY/edit?usp=sharing" },
  { nombre: "Campeche", url: "https://docs.google.com/spreadsheets/d/1W0rKWS7D_duMxYanmfbhRJ4rnLR3OhwlogT6eLOGBUE/edit?usp=sharing" },
  { nombre: "Cancun", url: "https://docs.google.com/spreadsheets/d/1Lqhhfl2BxvBGCyw31XVUt-JfxbzKAX9ScgseL0kHZ0o/edit?usp=sharing" },
  { nombre: "Chetumal", url: "https://docs.google.com/spreadsheets/d/1VaqdYAq2DFRzmrdfE74zmlcaVfeE3j14iP6GlJMa2KU/edit?usp=sharing" },
  { nombre: "Comitan", url: "https://docs.google.com/spreadsheets/d/1sVEtfAYIhdN84b3D4jUd95InMofhSkn-C-Tk5AQuRow/edit?usp=sharing" },
  { nombre: "Isla", url: "https://docs.google.com/spreadsheets/d/1kHjzqS0jFIZ8totCzNmLncZZNkM74-Urel_3Es_5TMc/edit?usp=sharing" },
  { nombre: "Merida", url: "https://docs.google.com/spreadsheets/d/1tunJIzlZvkIXXcPgJFz_6iTtTSnqRO0XGbWnRD0hYZw/edit?usp=sharing" },
  { nombre: "Puebla", url: "https://docs.google.com/spreadsheets/d/1xBi4p792inI9ri4HBlAN7RJsnORAcPOeQfcMfULXtts/edit?usp=sharing" },
  { nombre: "Tapachula", url: "https://docs.google.com/spreadsheets/d/1HWjfnPMlVLymbxijxM7K_QTlJwet1FXJewV3oaVNNxo/edit?usp=sharing" },
  { nombre: "Tierra blanca", url: "https://docs.google.com/spreadsheets/d/1H948pEXNl6znaEZIFn6K-Dg6riIvcgFaFFCcajcsDvQ/edit?usp=sharing" },
  { nombre: "Tizimin", url: "https://docs.google.com/spreadsheets/d/1oW5R1h3H7ln3DhXvgS54CRWobfIdoVw3Ct0GHVbNbvY/edit?usp=sharing" },
  { nombre: "Tuxtepec", url: "https://docs.google.com/spreadsheets/d/1cQoWZgYKqraWowlww_zY6Uqy3OzL90edFKpW4WTKjtI/edit?usp=sharing" },
  { nombre: "Tuxtla Gtz", url: "https://docs.google.com/spreadsheets/d/1C-kq4PlyZAWTx-6cFHLsYp1fdTsWtUsvYopRFiwso9Q/edit?usp=sharing" },
  { nombre: "Veracruz", url: "https://docs.google.com/spreadsheets/d/1q9dS7Hgr7J_EKJJgHPB2EnsXoepRAoLnTEfTyoVYY5s/edit?usp=sharing" },
  { nombre: "Villahermosa", url: "https://docs.google.com/spreadsheets/d/1MKd8vvvxL5anT9SleXPTab3VFRhnDmzwpB1ixcHD9R8/edit?usp=sharing" },
  { nombre: "Zapata", url: "https://docs.google.com/spreadsheets/d/14rqkAibT-QWjpFMoOzKJAf1IQrgNXm4VnO2RhAHJHNE/edit?usp=sharing" },
];

const comprasFormatos = [
  { nombre: "Seguimiento pedidos", url: "https://docs.google.com/spreadsheets/d/1ApXWPwKXZABhI6sYtYPPssYUBjUn5WleABOPKxeiVzs/edit?usp=sharing" },
  { nombre: "Seguimiento pagos", url: "https://docs.google.com/spreadsheets/d/1baGGvXTqdTTCZwx-WctaqZvo6AKGwfAJABR938E3lMc/edit?usp=sharing" },
];

export default function PortalInicio() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [estadoCuentaAbierto, setEstadoCuentaAbierto] = useState(false);
  const [bonificacionesAbierto, setBonificacionesAbierto] = useState(false);
  const [manualesAbierto, setManualesAbierto] = useState(false);
  const [showCapacitacion, setShowCapacitacion] = useState(false);
  const [AlmacenesAbierto, setAlmacenesAbierto] = useState(false);
  const [PresupuestosAbierto, setPresupuestosAbierto] = useState(false);
  const [boletinesAbierto, setBoletinesAbierto] = useState(false);
  const [procesosAbierto, setProcesosAbierto] = useState(false);
  const [marketingAbierto, setMarketingAbierto] = useState(false);
  const [cuentasAbierto, setCuentasAbierto] = useState(false);
  const [inventariosAbierto, setInventariosAbierto] = useState(false);
  const [videosAbierto, setVideosAbierto] = useState(false);
  const [comprasAbierto, setComprasAbierto] = useState(false);
  const [llantasAbierto, setLlantasAbierto] = useState(false);
  const [canaAbierto, setCanaAbierto] = useState(false);


  //REFERENCIAS
  const menuRef = useRef(null); // referencia al menú
  const panelRef = useRef(null); 
  const estadoCuentaRef = useRef(null);
  const bonificacionesRef = useRef(null);
  const cuentasRef = useRef(null);
  const comprasRef = useRef(null);

  //CERRAR EL MENU DE LIGUES AL HACER CLIC AFUERA
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar el panel de Estado de Cuenta al hacer clic fuera
  useEffect(() => {
    const handleClickOutsidePanel = (event) => {
      if (estadoCuentaRef.current && !estadoCuentaRef.current.contains(event.target)) {
        setEstadoCuentaAbierto(false);
      }
    };

    if (estadoCuentaAbierto) {
      document.addEventListener("mousedown", handleClickOutsidePanel);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePanel);
    };
  }, [estadoCuentaAbierto]);

  //UseEffect para el menu de bonificaciones (CERRAR EL HACER CLIC FUERA)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bonificacionesRef.current && !bonificacionesRef.current.contains(event.target)) {
        setBonificacionesAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //UseEffect para el panel de cuentas
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cuentasRef.current && !cuentasRef.current.contains(event.target)) {
        setCuentasAbierto(false);
      }
    };

    if (cuentasAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cuentasAbierto]);

  //UseEffect para el menu de compras)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comprasRef.current && !comprasRef.current.contains(event.target)) {
        setComprasAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //RENDER PRINCIPAL

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
          <BarChart3 className="w-10 h-10 text-blue-900 mb-4 group-hover:text-white" />
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
            <FileText className="w-10 h-10 text-yellow-500 mb-4 group-hover:text-white transition-colors" />
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
          <CoinsIcon className="w-10 h-10 text-pink-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Estado de cuenta
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Consulta los pagos registrados por sucursal.
          </p>
        </motion.div>

        {/* Tarjeta 4 - Capacitación */}
        <motion.a
          onClick={() => setShowCapacitacion(true)}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-orange-700 cursor-pointer h-full"
        >
          <Video className="w-10 h-10 text-orange-700 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
            Capacitación
          </h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Accede material de capacitación.
          </p>
        </motion.a>

        {/* Tarjeta 5 - Compras a proveedores externos */}
        <div ref={comprasRef} className="relative h-full flex">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setComprasAbierto(!comprasAbierto);
            }}
            className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-purple-600 cursor-pointer h-full w-full"
          >
            <BadgePercent className="w-10 h-10 text-purple-600 mb-4 group-hover:text-white transition-colors" />
            <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
              Compras a proveedores externos
            </h2>
            <p className="text-gray-600 text-sm group-hover:text-gray-200">
              Seguimiento de compras a proveedores
            </p>
            <ChevronDown
              className={`w-5 h-5 mt-3 text-gray-600 group-hover:text-white transition-transform ${
                bonificacionesAbierto ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          {/* Menú desplegable Bonificaciones */}
          <AnimatePresence>
            {comprasAbierto && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-1 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl p-4 w-full z-50 text-left max-h-72 overflow-y-auto"
              >
                {comprasFormatos.map((sucursal, i) => (
                  <a
                    key={i}
                    href={sucursal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-800 py-1.5 px-2 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    {sucursal.nombre}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tarjeta 6 - Bonificaciones */}
        <div ref={bonificacionesRef} className="relative h-full flex">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setBonificacionesAbierto(!bonificacionesAbierto);
            }}
            className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-teal-600 cursor-pointer h-full w-full"
          >
            <BadgePercent className="w-10 h-10 text-teal-600 mb-4 group-hover:text-white transition-colors" />
            <h2 className="text-xl font-semibold mb-2 group-hover:text-white">
              Bonificaciones
            </h2>
            <p className="text-gray-600 text-sm group-hover:text-gray-200">
              Seguimiento de bonificaciones por sucursal
            </p>
            <ChevronDown
              className={`w-5 h-5 mt-3 text-gray-600 group-hover:text-white transition-transform ${
                bonificacionesAbierto ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          {/* Menú desplegable Bonificaciones */}
          <AnimatePresence>
            {bonificacionesAbierto && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-1 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl p-4 w-full z-50 text-left max-h-72 overflow-y-auto"
              >
                {sucursalesBonificaciones.map((sucursal, i) => (
                  <a
                    key={i}
                    href={sucursal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-800 py-1.5 px-2 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    {sucursal.nombre}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tarjeta 7 - Manuales de partes, catálogos y fichas técnicas */}
        <motion.div
          whileHover={{ scale: !manualesAbierto ? 1.05 : 1, y: !manualesAbierto ? -5 : 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setManualesAbierto(true)}              // 👈 AQUÍ ABRE EL PANEL
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-fuchsia-900 hover:text-white cursor-pointer h-full"
        >
          <Library className="w-10 h-10 text-fuchsia-900 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Manuales de partes, catálogos y fichas técnicas</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Documentación
          </p>
        </motion.div>

        {/* Tarjeta 8 - GESTION DE ALMACENES */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAlmacenesAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-emerald-800 hover:text-white cursor-pointer h-full"
        >
          <Boxes className="w-10 h-10 text-emerald-800 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Gestión de almacenes</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Control y operaciones de almacén.</p>
        </motion.div>

        {/* Tarjeta 9 - PRESUPUESTOS */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPresupuestosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-yellow-900 hover:text-white cursor-pointer h-full"
        >
          <ClipboardList className="w-10 h-10 text-yellow-900 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Presupuestos</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Presupuestos del departamento general y por sucursal.</p>
        </motion.div>

        {/* Tarjeta 9 - BOLETINES */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setBoletinesAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-red-600 hover:text-white cursor-pointer h-full"
        >
          <Megaphone className="w-10 h-10 text-red-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Boletines</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Avisos, novedades, comunicados internos y de John Deere.</p>
        </motion.div>

        {/* Tarjeta 10 - PROCESOS Y POLITICAS */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setProcesosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-teal-400 hover:text-white cursor-pointer h-full"
        >
          <BookOpenText className="w-10 h-10 text-teal-400 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Procesos y políticas</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Normativas internas y procedimientos.</p>
        </motion.div>

        {/* Tarjeta 11 - MARKETING */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMarketingAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-violet-400 hover:text-white cursor-pointer h-full"
        >
          <Building2 className="w-10 h-10 text-violet-400 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Marketing</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Material gráfico y promocionales.</p>
        </motion.div>

        {/* Tarjeta 12 - Cuentas bancarias */}
        <motion.div
          whileHover={{ scale: !cuentasAbierto ? 1.05: 1, y: !cuentasAbierto ? -5:0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCuentasAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-cyan-600 hover:text-white cursor-pointer h-full"
        >
          <ListChecks className="w-10 h-10 text-cyan-600 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Cuentas bancarias</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Carátula bancaria por agencia para pagos de refacciones para clientes.</p>
        </motion.div>

        {/* Tarjeta 13 - INVENTARIOS CICLICOS Y SEMESTRALES */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setInventariosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-pink-400 hover:text-white cursor-pointer h-full"
        >
          <PackageSearch className="w-10 h-10 text-pink-400 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Inventarios</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">Control de inventarios cíclicos y generales.</p>
        </motion.div>

        {/* Tarjeta 14 - videos promocionales */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setVideosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-blue-800 hover:text-white cursor-pointer h-full"
        >
          <Videotape className="w-10 h-10 text-blue-800 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Videos promocionales</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Internos y por proveedor
          </p>
        </motion.div>

        {/* Tarjeta 15 - Línea de llantas */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setVideosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-black hover:text-white cursor-pointer h-full"
        >
          <CircleDot className="w-10 h-10 text-black mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Llantas</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Catálogos e información de utilidad
          </p>
        </motion.div>

        {/* Tarjeta 16 - Línea de caña */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setVideosAbierto(true)}
          className="group bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:bg-yellow-800 hover:text-white cursor-pointer h-full"
        >
          <Sprout className="w-10 h-10 text-yellow-800 mb-4 group-hover:text-white transition-colors" />
          <h2 className="text-xl font-semibold mb-2">Línea de caña</h2>
          <p className="text-gray-600 text-sm group-hover:text-gray-200">
            Catálogos e información
          </p>
        </motion.div>

      </div>

      <AnimatePresence>
        <Suspense fallback={<div className="text-white">Cargando…</div>}>
          {estadoCuentaAbierto && (
            <EstadoCuentaPanel
              onClose={() => setEstadoCuentaAbierto(false)}
              panelRef={estadoCuentaRef}
            />
          )}
          
          {manualesAbierto && (
            <ManualesPanel
              isOpen={manualesAbierto}
              onClose={() => setManualesAbierto(false)}
            />
          )}
          {showCapacitacion && (
            <CapacitacionPanel
              isOpen={showCapacitacion}
              onClose={() => setShowCapacitacion(false)}
            />
          )}
          {videosAbierto && (
            <VideosPanel
              isOpen={videosAbierto}
              onClose={() => setVideosAbierto(false)}
            />
          )}
          {AlmacenesAbierto && (
            <GestionAlmacenesPanel
              isOpen={AlmacenesAbierto}
              onClose={() => setAlmacenesAbierto(false)}
            />
          )}
          {PresupuestosAbierto && (
            <PresupuestosPanel
              isOpen={PresupuestosAbierto}
              onClose={() => setPresupuestosAbierto(false)}
            />
          )}
          {boletinesAbierto && (
            <BoletinesPanel
              isOpen={boletinesAbierto}
              onClose={() => setBoletinesAbierto(false)}
            />
          )}
          {marketingAbierto && (
            <MarketingPanel
              isOpen={marketingAbierto}
              onClose={() => setMarketingAbierto(false)}
            />
          )}
          {inventariosAbierto && (
            <InventariosPanel
              isOpen={inventariosAbierto}
              onClose={() => setInventariosAbierto(false)}
            />
          )}
          {procesosAbierto && (
            <ProcesosPanel
              isOpen={procesosAbierto}
              onClose={() => setProcesosAbierto(false)}
            />
          )}
          {llantasAbierto && (
            <LlantasPanel
              isOpen={llantasAbierto}
              onClose={() => setLlantasAbierto(false)}
            />
          )}
          {canaAbierto && (
            <CanaPanel
              isOpen={canaAbierto}
              onClose={() => setCanaAbierto(false)}
            />
          )}
          

        </Suspense>
        {cuentasAbierto && (
            <CuentasPanel
              isOpen={cuentasAbierto}
              onClose={() => setCuentasAbierto(false)}
              panelRef={cuentasRef}
            />
          )}
      </AnimatePresence>
                
    </div>
  );
}
