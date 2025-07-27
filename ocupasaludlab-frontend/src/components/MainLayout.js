import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { LogOut } from "lucide-react";


const MainLayout = () => {
const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("access"); // o el nombre de tu token
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col justify-between">
        <div className="p-4 space-y-2">
          <Link to="/" className="block">Inicio</Link>
          <Link to="/paciente" className="block">Nuevo paciente</Link>
          <Link to="/fichas" className="block">Fichas</Link>
          <Link to="/configuracion" className="block">Configuración</Link>
        </div>

        {/* Botón Cerrar sesión */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
