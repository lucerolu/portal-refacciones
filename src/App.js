import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PortalInicio from "./components/PortalInicio";
import Login from "./components/Login";
import ValidateLogin from "./components/ValidateLogin";

// 🔐 helper simple para revisar sesión
function isAuthenticated() {
  return document.cookie.includes("auth=true");
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Magic link */}
      <Route path="/validate" element={<ValidateLogin />} />

      {/* Portal protegido */}
      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <PortalInicio />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
