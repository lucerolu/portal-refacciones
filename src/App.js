import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PortalInicio from "./components/PortalInicio";
import Login from "./components/Login";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setAutenticado(true);
    }
  }, []);

  return (
    <>
      {autenticado ? (
        <>
          <Navbar />     
          <PortalInicio />
        </>
      ) : (
        <Login onLogin={() => setAutenticado(true)} />
      )}
    </>
  );
}

export default App;
