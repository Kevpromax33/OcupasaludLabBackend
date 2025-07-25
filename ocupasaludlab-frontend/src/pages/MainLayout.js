import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", backgroundColor: "#1E3A8A", color: "white", padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>OcupasaludLab</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</a></li>
          <li><a href="/nuevo-paciente" style={{ color: "white", textDecoration: "none" }}>Nuevo Paciente</a></li>
          <li><a href="/fichas" style={{ color: "white", textDecoration: "none" }}>Fichas</a></li>
          <li><a href="/configuracion" style={{ color: "white", textDecoration: "none" }}>Configuración</a></li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main style={{ flexGrow: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
