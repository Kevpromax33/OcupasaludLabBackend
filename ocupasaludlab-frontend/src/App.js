import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NuevoPaciente from "./pages/NuevoPaciente";
import Paciente from "./pages/Paciente";
import Fichas from "./pages/Fichas";
import NuevaFicha from "./pages/NuevaFicha";
import FichaDetalle from "./pages/FichaDetalle";
import Configuracion from "./pages/Configuracion";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Dashboard />} />
        {/* Rutas privadas dentro del layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nuevo-paciente" element={<NuevoPaciente />} />
            <Route path="/paciente/:id" element={<Paciente />} />
            <Route path="/fichas" element={<Fichas />} />
            <Route path="/fichas/nueva" element={<NuevaFicha />} />
            <Route path="/fichas/:id" element={<FichaDetalle />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
