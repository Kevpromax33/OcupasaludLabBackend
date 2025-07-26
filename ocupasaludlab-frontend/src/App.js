import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Paciente from "./pages/Paciente";
import Fichas from "./pages/Fichas";
import FichaDetalle from "./pages/FichaDetalle";
import NuevaFicha from "./pages/NuevaFicha";
import NuevoPaciente from "./pages/NuevoPaciente";
import Configuracion from "./pages/Configuracion";
import Home from "./pages/Home";

import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
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
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        {/* Redirección por defecto: si no hay ruta, manda al login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
