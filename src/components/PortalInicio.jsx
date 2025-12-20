import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  ChevronDown,
  Video,
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
  Sprout,
  FolderCheck,
} from "lucide-react";

import Navbar from "./Navbar";
import ConstelacionesFondo from "./ConstelacionesFondo";

/* =======================
   Lazy panels
======================= */
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
const MaterialPanel = lazy(() => import("./MaterialPanel"));

/* =======================
   DATA (sin cambios)
======================= */

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


/* =======================
   COMPONENT
======================= */
export default function PortalInicio() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [bonificacionesAbierto, setBonificacionesAbierto] = useState(false);
  const [comprasAbierto, setComprasAbierto] = useState(false);

  const [activePanel, setActivePanel] = useState(null);

  const menuRef = useRef(null);
  const panelRef = useRef(null);

  /* =======================
     Click fuera GLOBAL
  ======================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setActivePanel(null);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
        setBonificacionesAbierto(false);
        setComprasAbierto(false);
      }
    };

    if (activePanel || menuAbierto || bonificacionesAbierto || comprasAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePanel, menuAbierto, bonificacionesAbierto, comprasAbierto]);

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8 overflow-hidden">
      <ConstelacionesFondo />
      <Navbar />

      {/* ================= GRID ================= */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full z-20">

        {/* Dashboard */}
        <motion.a
          href="https://dshb-dm-refacciones.streamlit.app/#resumen-general-de-compras-2025"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          className="card"
        >
          <BarChart3 className="icon text-blue-900" />
          <h2>Dashboard</h2>
          <p>Visualiza estadísticas y reportes.</p>
        </motion.a>

        {/* Ligues */}
        <div ref={menuRef} className="relative">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="card cursor-pointer"
          >
            <FileText className="icon text-yellow-500" />
            <h2>Ligues</h2>
            <ChevronDown className={menuAbierto ? "rotate-180" : ""} />
          </motion.div>

          <AnimatePresence>
            {menuAbierto && (
              <motion.div className="dropdown">
                {sucursales.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.nombre}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Estado de cuenta */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("estadoCuenta")}
          className="card cursor-pointer"
        >
          <CoinsIcon className="icon text-pink-600" />
          <h2>Estado de cuenta</h2>
        </motion.div>

        {/* Manuales */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("manuales")}
          className="card cursor-pointer"
        >
          <Library className="icon text-fuchsia-700" />
          <h2>Manuales</h2>
        </motion.div>

        {/* Capacitación */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("capacitacion")}
          className="card cursor-pointer"
        >
          <Video className="icon text-orange-600" />
          <h2>Capacitación</h2>
        </motion.div>

        {/* Compras a proveedores externos */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("compras")}
          className="card cursor-pointer"
        >
          <BadgePercent className="icon text-purple-600" />
          <h2>Compras a proveedores externos</h2>
        </motion.div>

        {/* Bonificaciones */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("bonificaciones")}
          className="card cursor-pointer"
        >
          <BadgePercent className="icon text-teal-600" />
          <h2>Bonificaciones</h2>
        </motion.div>

        {/* Gestión de almacenes */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("almacenes")}
          className="card cursor-pointer"
        >
          <Boxes className="icon text-emerald-700" />
          <h2>Gestión de almacenes</h2>
        </motion.div>

        {/* Presupuestos */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("presupuestos")}
          className="card cursor-pointer"
        >
          <ClipboardList className="icon text-yellow-800" />
          <h2>Presupuestos</h2>
        </motion.div>

        {/* Boletines */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("boletines")}
          className="card cursor-pointer"
        >
          <Megaphone className="icon text-red-600" />
          <h2>Boletines</h2>
        </motion.div>

        {/* Procesos y políticas */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("procesos")}
          className="card cursor-pointer"
        >
          <BookOpenText className="icon text-teal-500" />
          <h2>Procesos y políticas</h2>
        </motion.div>

        {/* Marketing */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("marketing")}
          className="card cursor-pointer"
        >
          <Building2 className="icon text-violet-500" />
          <h2>Marketing</h2>
        </motion.div>

        {/* Cuentas bancarias */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("cuentas")}
          className="card cursor-pointer"
        >
          <ListChecks className="icon text-cyan-600" />
          <h2>Cuentas bancarias</h2>
        </motion.div>

        {/* Inventarios */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("inventarios")}
          className="card cursor-pointer"
        >
          <PackageSearch className="icon text-pink-500" />
          <h2>Inventarios</h2>
        </motion.div>

        {/* Videos promocionales */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("videos")}
          className="card cursor-pointer"
        >
          <Videotape className="icon text-blue-700" />
          <h2>Videos promocionales</h2>
        </motion.div>

        {/* Llantas */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("llantas")}
          className="card cursor-pointer"
        >
          <CircleDot className="icon text-black" />
          <h2>Llantas</h2>
        </motion.div>

        {/* Línea de caña */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("cana")}
          className="card cursor-pointer"
        >
          <Sprout className="icon text-yellow-700" />
          <h2>Línea de caña</h2>
        </motion.div>

        {/* Material de juntas */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => setActivePanel("material")}
          className="card cursor-pointer"
        >
          <FolderCheck className="icon text-yellow-400" />
          <h2>Material de juntas</h2>
        </motion.div>

      </div>

      {/* ================= PANELS ================= */}
      <AnimatePresence>
        <Suspense fallback={<div className="text-white">Cargando…</div>}>

          {activePanel === "estadoCuenta" && (
            <EstadoCuentaPanel onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "manuales" && (
            <ManualesPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "capacitacion" && (
            <CapacitacionPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "videos" && (
            <VideosPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "almacenes" && (
            <GestionAlmacenesPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "presupuestos" && (
            <PresupuestosPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "boletines" && (
            <BoletinesPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "marketing" && (
            <MarketingPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "inventarios" && (
            <InventariosPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "procesos" && (
            <ProcesosPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "cuentas" && (
            <CuentasPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "llantas" && (
            <LlantasPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "cana" && (
            <CanaPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

          {activePanel === "material" && (
            <MaterialPanel isOpen onClose={() => setActivePanel(null)} panelRef={panelRef} />
          )}

        </Suspense>
      </AnimatePresence>
    </div>
  );
}
