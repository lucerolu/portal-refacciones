//src\components\ValidateLogin.jsx
//malditaseanecesitohaceruncambio

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ValidateLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    fetch(`/api/validate-magic-link?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        navigate("/portal");
      })
      .catch(() => {
        alert("El enlace expiró o es inválido");
        navigate("/");
      });
  }, []);

  return <p className="p-8">Validando acceso…</p>;
}
