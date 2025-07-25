import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FichaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ficha, setFicha] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://ocupasaludlab-backend.onrender.com/api/fichas/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener ficha");

        const data = await res.json();
        setFicha(data);
      } catch (error) {
        console.error("Error al cargar la ficha:", error);
      }
    };

    fetchFicha();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFicha((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ocupasaludlab-backend.onrender.com/api/fichas/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ficha),
      });

      if (!res.ok) throw new Error("Error al guardar la ficha");

      const dataActualizada = await res.json();
      setFicha(dataActualizada);
      setModoEdicion(false);
      alert("Cambios guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudieron guardar los cambios.");
    }
  };

  const eliminarFicha = async () => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta ficha?");
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ocupasaludlab-backend.onrender.com/api/fichas/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar la ficha");

      alert("Ficha eliminada correctamente");
      navigate("/fichas");
    } catch (error) {
      console.error("Error al eliminar ficha:", error);
      alert("No se pudo eliminar la ficha.");
    }
  };

  if (!ficha) return <div className="p-6">Cargando ficha...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Ficha #{id}</h1>
        <button
          onClick={() => setModoEdicion(!modoEdicion)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {modoEdicion ? "Modo lectura" : "Editar"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Paciente</label>
          <input
            type="text"
            name="paciente"
            value={ficha.paciente}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">DNI</label>
          <input
            type="text"
            name="dni"
            value={ficha.dni}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={ficha.fecha}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Observaciones</label>
          <textarea
            name="observaciones"
            value={ficha.observaciones}
            onChange={handleChange}
            disabled={!modoEdicion}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
            rows={4}
          />
        </div>

        {modoEdicion && (
          <div className="flex justify-between mt-4">
            <button
              onClick={guardarCambios}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Guardar cambios
            </button>
            <button
              onClick={eliminarFicha}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Eliminar ficha
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FichaDetalle;
