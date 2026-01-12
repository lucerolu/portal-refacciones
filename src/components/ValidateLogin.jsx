//src\components\ValidateLogin.jsx
//

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ValidateLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("validating");
  // validating | success | error

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/validate-magic-link?token=${token}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatus("success");

        // ⏳ pequeña pausa para UX
        setTimeout(() => {
          navigate("/portal");
        }, 1500);
      })
      .catch(() => {
        setStatus("error");

        setTimeout(() => {
          navigate("/");
        }, 2500);
      });
  }, [navigate, params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {status === "validating" && (
        <p className="text-lg animate-pulse">Validando acceso…</p>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="text-2xl font-semibold text-green-400">
            Sesión verificada ✅
          </p>
          <p className="mt-2 text-gray-300">
            Redirigiendo al portal…
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="text-xl text-red-400">
            El enlace expiró o es inválido
          </p>
          <p className="mt-2 text-gray-300">
            Redirigiendo al inicio…
          </p>
        </div>
      )}
    </div>
  );
}
