import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ConstelacionesFondo() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(() => {}, []);

  return (
    <div
      id="fondo-constelaciones"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#174e1eff", // fondo casi negro con un tono azul
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
        options={{
          fullScreen: { enable: false },
          background: { color: "#1c4116ff" },
          fpsLimit: 60,
          particles: {
            number: { value: 130, density: { enable: true, area: 800 } },
            color: {
              value: ["#e517ecff", "#f3ef0fff", "#10f7ebff", "#fa7407ff"], // 💠 colores suaves y claros
            },
            shape: { type: "circle" },
            opacity: {
              value: 0.7,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.2, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              anim: { enable: true, speed: 2, size_min: 0.3, sync: false },
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            links: {
              enable: true,
              color: "#a0c4ff",
              distance: 150,
              opacity: 0.25,
              width: 0.8,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
