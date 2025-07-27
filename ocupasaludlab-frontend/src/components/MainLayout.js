// src/components/MainLayout.js
import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (íconos verticales) */}
      <Sidebar />

      {/* Contenido general */}
      <div className="flex-1 flex flex-col">
        {/* Franja azul superior con solo logo */}
        <header className="bg-blue-900 text-white px-6 py-4 shadow flex items-center">
          <div className="text-2xl font-bold">OL</div> {/* Aquí puedes poner un logo luego */}
        </header>

        {/* Contenido de la página */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;