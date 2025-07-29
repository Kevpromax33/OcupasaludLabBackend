import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Paciente from "./pages/Paciente";
import Fichas from "./pages/Fichas";
import FichaDetalle from "./pages/FichaDetalle";
import NuevaFicha from "./pages/NuevaFicha";
import NuevoPaciente from "./pages/NuevoPaciente";
import Configuracion from "./pages/Configuracion";
import InactivityHandler from "./components/InactivityHandler";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <InactivityHandler>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas privadas con layout */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/paciente/:id" element={<Paciente />} />
              <Route path="/fichas" element={<Fichas />} />
              <Route path="/fichas/:id" element={<FichaDetalle />} />
              <Route path="/fichas/nueva" element={<NuevaFicha />} />
              <Route path="/nuevo-paciente" element={<NuevoPaciente />} />
              <Route path="/configuracion" element={<Configuracion />} />

              {/* Redirige "/" hacia el dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Si no encuentra ruta, manda al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </InactivityHandler>
    </Router>
  );
}

export default App;
