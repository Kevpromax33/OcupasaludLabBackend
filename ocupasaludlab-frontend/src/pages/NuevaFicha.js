import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NuevaFicha = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    paciente_id: "",
    tipo: "",
    fecha: "",
    observaciones: "",
  });

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://<TU-BACKEND>.onrender.com/api/pacientes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error cargando pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://<TU-BACKEND>.onrender.com/api/fichas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al registrar ficha");

      navigate("/fichas");
    } catch (error) {
      console.error("Error al guardar ficha:", error);
      alert("No se pudo guardar la ficha");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nueva ficha ocupacional</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-medium">Paciente</label>
          <select
            name="paciente_id"
            value={form.paciente_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} - {p.dni}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Tipo de ficha</label>
          <input
            type="text"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Observaciones</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar ficha
        </button>
      </form>
    </div>
  );
};

export default NuevaFicha;
