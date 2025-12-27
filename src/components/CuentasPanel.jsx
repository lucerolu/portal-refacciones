// src/components/CuentasPanel.jsx
import { useState, useRef, useEffect } from "react";
import { cuentasBancarias } from "../data/cuentasBancarias";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";

import logo1 from "../assets/logo1.jpeg";
import logo2 from "../assets/logo2.png";

/* ===========================
   GOOGLE MAPS STATIC (PDF)
=========================== */
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const getStaticMapUrl = (lat, lng) => {
  if (!lat || !lng) return null;

  return `https://maps.googleapis.com/maps/api/staticmap
    ?center=${lat},${lng}
    &zoom=16
    &size=600x300
    &markers=color:red|${lat},${lng}
    &key=${GOOGLE_MAPS_KEY}
  `.replace(/\s/g, "");
};
/* =========================== */

export default function CuentasPanel({ isOpen, onClose, panelRef }) {
  const [seleccion, setSeleccion] = useState(null);
  const [qrMap, setQrMap] = useState({}); // ← QR por cada cuenta

  const cardRef = useRef(null);

  const copiar = (texto) => navigator.clipboard.writeText(texto);

  // ✔ Generar QR para cada cuenta separada
  useEffect(() => {
    const generarTodos = async () => {
      if (!seleccion) return;

      const nuevosQR = {};

      for (const cuenta of seleccion.cuentas) {
        if (cuenta.clabe) {
          nuevosQR[cuenta.clabe] = await QRCode.toDataURL(cuenta.clabe);
        }
      }

      setQrMap(nuevosQR);
    };

    generarTodos();
  }, [seleccion]);

  const prepararExport = () => document.body.classList.add("exportando");
  const finalizarExport = () => document.body.classList.remove("exportando");

  // ✔ Exportación PDF con proporción correcta (sin deformarse)
  const exportarPDF = async () => {
    prepararExport();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
    });

    finalizarExport();

    const imgData = canvas.toDataURL("image/png");


    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
    });

    // Logos (ajustados)
    pdf.addImage(logo1, "JPEG", 40, 20, 160, 60);
    pdf.addImage(logo2, "PNG", 380, 25, 180, 45);

    // ---- CALCULAR PROPORCIÓN SIN DEFORMAR ----
    const pageWidth = 520;
    const pageHeight = 650;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    const finalW = imgWidth * ratio;
    const finalH = imgHeight * ratio;

    pdf.addImage(imgData, "PNG", 40, 100, finalW, finalH);

    pdf.save(`Cuenta-${seleccion.nombre}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start p-4 pt-24 pb-24 z-50">
      <div
        ref={panelRef}
        className="bg-white p-6 pb-10 rounded-2xl w-full max-w-2xl shadow-xl relative max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Cuentas Bancarias
        </h2>

        <div className="mb-8 mt-4">
          <select
            className="w-full p-3 border rounded-xl"
            onChange={(e) => {
              const suc = cuentasBancarias.find((s) => s.nombre === e.target.value);
              setSeleccion(suc);
            }}
          >
            <option value="">Selecciona una sucursal</option>
            {cuentasBancarias.map((s) => (
              <option key={s.nombre} value={s.nombre}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>

        {seleccion && (
          <div ref={cardRef} className="bg-gray-50 p-6 rounded-xl shadow-md border">

            <h3 className="text-xl font-semibold mb-3">{seleccion.nombre}</h3>

            <p><strong>Razón social:</strong> {seleccion.razonSocial}</p>
            <p><strong>RFC:</strong> {seleccion.rfc}</p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Cuentas bancarias:</h4>

              {seleccion.cuentas
                .filter(c => c.cuenta || c.clabe)
                .map((c, i) => (
                  <div
                    key={i}
                    className="relative mb-3 p-3 bg-white rounded-lg shadow
                              sm:flex sm:items-start sm:justify-between sm:gap-4"
                  >

                    {/* Columna izquierda: datos y botones */}
                    <div className="flex-1">

                      <p><strong>Banco:</strong> {c.banco || "—"}</p>
                      <p><strong>Cuenta:</strong> {c.cuenta || "—"}</p>
                      <p><strong>CLABE:</strong> {c.clabe || "—"}</p>
                      <p><strong>Moneda:</strong> {c.moneda}</p>

                      <div className="flex gap-3 mt-2 flex-wrap">
                        <button
                          className="no-print text-sm px-3 py-1 bg-cyan-600 text-white rounded-lg"
                          onClick={() => copiar(c.cuenta || "")}
                        >
                          Copiar cuenta
                        </button>

                        <button
                          className="no-print text-sm px-3 py-1 bg-purple-600 text-white rounded-lg"
                          onClick={() => copiar(c.clabe || "")}
                        >
                          Copiar CLABE
                        </button>
                      </div>
                    </div>

                    {/* Columna derecha: QR */}
                    {qrMap[c.clabe] && (
                      <img
                        src={qrMap[c.clabe]}
                        alt="QR"
                        className="
                          w-24 h-24 rounded-lg shadow
                          sm:relative sm:top-0 sm:right-0
                          mx-auto mt-4 sm:mt-0
                        "
                      />
                    )}
                  </div>

                ))}
            </div>

            <div className="mt-4">
              <p><strong>Correos para notificar pago:</strong></p>
              {seleccion.notificarPago.map((mail, i) => (
                <p key={i} className="text-sm">{mail}</p>
              ))}
            </div>

            {seleccion.telefono && (
              <p className="mt-3"><strong>Teléfono:</strong> {seleccion.telefono}</p>
            )}
            {seleccion.celular && (
              <p><strong>Celular:</strong> {seleccion.celular}</p>
            )}

            {/* Dirección */}
            {seleccion.direccion && (
              <p className="mt-3">
                <strong>Dirección:</strong> {seleccion.direccion}
              </p>
            )}

            {/* Mapa */}
            {seleccion.mapsUrl && (
              <div className="no-print mt-3 rounded-xl overflow-hidden border">
                <iframe
                  src={seleccion.mapsUrl}
                  width="100%"
                  height="200"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            )}
            {/* Mapa para PDF / imagen */}
            {seleccion.coords && (
              <div className="print-only mt-3 rounded-xl overflow-hidden border">
                <img
                  src={getStaticMapUrl(
                    seleccion.coords.lat,
                    seleccion.coords.lng
                  )}
                  crossOrigin="anonymous"
                  alt="Mapa ubicación"
                  className="w-full h-[200px] object-cover rounded-xl"
                />
              </div>
            )}


          </div>
        )}

        {seleccion && (
          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => {
                prepararExport();
                html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
                  finalizarExport();
                  const img = canvas.toDataURL("image/png");
                  const a = document.createElement("a");
                  a.href = img;
                  a.download = `Cuenta-${seleccion.nombre}.png`;
                  a.click();
                });
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Imagen PNG
            </button>

            <button
              onClick={exportarPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
