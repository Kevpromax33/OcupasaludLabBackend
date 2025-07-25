import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Fichas = () => {
  const [fichas, setFichas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://<TU-BACKEND>.onrender.com/api/fichas/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener las fichas");

        const data = await res.json();
        setFichas(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  const fichasFiltradas = fichas.filter((ficha) => {
    const texto = filtro.toLowerCase();
    return (
      ficha.paciente_nombre.toLowerCase().includes(texto) ||
      ficha.paciente_dni.includes(texto)
    );
  });

  if (loading) return <div>Cargando fichas...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">Fichas ocupacionales</h1>
        <button
          onClick={() => navigate("/fichas/nueva")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Nueva ficha
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por DNI o nombre del paciente"
          className="w-full md:w-96 p-2 border rounded"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Paciente</th>
            <th className="p-3">DNI</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fichasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No se encontraron fichas
              </td>
            </tr>
          ) : (
            fichasFiltradas.map((ficha) => (
              <tr key={ficha.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{ficha.paciente_nombre}</td>
                <td className="p-3">{ficha.paciente_dni}</td>
                <td className="p-3">{ficha.fecha}</td>
                <td className="p-3">{ficha.tipo}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/fichas/${ficha.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Ver ficha
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Fichas;
