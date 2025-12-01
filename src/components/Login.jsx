import { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const USER = "dimauser25";        // <-- tu usuario
  const PASSWORD = "Authdms30";    // <-- tu contraseña

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === USER && contrasena === PASSWORD) {
      localStorage.setItem("auth", "true"); // guardar sesión
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Acceso</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
