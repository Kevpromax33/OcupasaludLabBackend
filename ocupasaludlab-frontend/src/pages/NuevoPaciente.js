import React, { useState } from "react";
import api from "../api"; // importa tu api.js

function NuevoPaciente() {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    genero: "",
    telefono: "",
    direccion: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");
      if (!token) {
        setMensaje("❌ No hay sesión activa, inicia sesión nuevamente.");
        return;
      }

      const response = await api.post(
        "pacientes/", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMensaje("✅ Paciente guardado exitosamente.");
        setFormData({
          dni: "",
          nombres: "",
          apellidos: "",
          fecha_nacimiento: "",
          genero: "",
          telefono: "",
          direccion: "",
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        setMensaje(`❌ Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Error sin respuesta:", error.message);
        setMensaje("❌ No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Nuevo Paciente</h1>
      {mensaje && (
        <div className="mb-4 p-3 bg-gray-100 border rounded">{mensaje}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
      >
        <div>
          <label className="block text-gray-700">DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Género</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Seleccione...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Paciente
        </button>
      </form>
    </div>
  );
}

export default NuevoPaciente;
