//src\components\Login.jsx

import { useState } from "react";

export default function Login() {
  const [emailUser, setEmailUser] = useState("");
  const [status, setStatus] = useState("form"); // form | sent | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = `${emailUser}@dimasur.com.mx`;

    if (!emailUser) {
      setError("Ingresa tu correo empresarial");
      return;
    }

    try {
      const res = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      setStatus("sent");
    } catch {
      setError("Error al enviar el enlace");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Acceso</h2>

        {status === "form" && (
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex mb-4">
              <input
                type="text"
                placeholder="usuario"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
                className="flex-1 p-2 border rounded-l-md"
              />
              <span className="p-2 bg-gray-200 border border-l-0 rounded-r-md">
                @dimasur.com.mx
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white p-2 rounded-lg">
              Enviar enlace
            </button>
          </form>
        )}

        {status === "sent" && (
          <p className="text-green-600">
            Te enviamos un enlace a tu correo para acceder.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600">
            Ocurrió un problema, intenta de nuevo.
          </p>
        )}
      </div>
    </div>
  );
}
