import React from "react";
import { Users, FileText, Calendar } from "lucide-react";

function Dashboard() {
  // Datos simulados (luego se conectará al backend)
  const pacientesAtendidos = 124;
  const fichasRealizadas = 87;
  const proximasCitas = 5;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Panel de Control</h1>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Users size={40} className="text-blue-600" />
          <div>
            <p className="text-gray-600">Pacientes atendidos</p>
            <h2 className="text-3xl font-bold">{pacientesAtendidos}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <FileText size={40} className="text-green-600" />
          <div>
            <p className="text-gray-600">Fichas realizadas</p>
            <h2 className="text-3xl font-bold">{fichasRealizadas}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Calendar size={40} className="text-purple-600" />
          <div>
            <p className="text-gray-600">Próximas citas</p>
            <h2 className="text-3xl font-bold">{proximasCitas}</h2>
          </div>
        </div>
      </div>

      {/* Lista de pacientes (ejemplo) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Últimos pacientes</h2>
        <ul className="bg-white p-4 rounded-xl shadow divide-y">
          <li className="py-2 flex justify-between">
            <span>Juan Pérez</span>
            <span className="text-gray-500">DNI: 12345678</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Ana García</span>
            <span className="text-gray-500">DNI: 87654321</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
