// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, UserPlus, FileText, Settings } from "lucide-react";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition text-white";

  return (
    <aside className="w-20 bg-blue-900 h-screen flex flex-col items-center py-4">
      {/* Logo o ícono */}
      <div className="text-white text-2xl font-extrabold mb-6">OL</div>

      {/* Menú */}
      <nav className="flex flex-col items-center space-y-6 mt-4">
        <NavLink to="/" className={linkStyle}>
          <Home size={24} />
        </NavLink>
        <NavLink to="/nuevo-paciente" className={linkStyle}>
          <UserPlus size={24} />
        </NavLink>
        <NavLink to="/fichas" className={linkStyle}>
          <FileText size={24} />
        </NavLink>
        <NavLink to="/configuracion" className={linkStyle}>
          <Settings size={24} />
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
