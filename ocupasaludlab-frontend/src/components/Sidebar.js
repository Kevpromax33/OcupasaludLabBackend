// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, UserPlus, FileText, Settings } from "lucide-react";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition";

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 font-bold text-xl border-b">OcupasaludLab</div>
      <nav className="flex flex-col p-4 space-y-2">
        <NavLink to="/dashboard"className={linkStyle}>
          <Home size={20} /> Inicio
        </NavLink>
        <NavLink to="/nuevo-paciente" className={linkStyle}>
          <UserPlus size={20} /> Nuevo paciente
        </NavLink>
        <NavLink to="/fichas" className={linkStyle}>
          <FileText size={20} /> Fichas
        </NavLink>
        <NavLink to="/configuracion" className={linkStyle}>
          <Settings size={20} /> Configuración
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
