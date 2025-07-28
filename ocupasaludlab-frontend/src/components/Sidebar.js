import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, UserPlus, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const linkStyle =
    "flex items-center gap-3 p-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium";

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl border-b text-blue-700">
          OcupasaludLab
        </div>
        <nav className="flex flex-col p-4 space-y-3">
          <NavLink to="/dashboard" className={linkStyle}>
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
      </div>

      {/* Botón cerrar sesión */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 p-3 rounded-lg transition font-semibold"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
