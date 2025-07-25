import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Paciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://<TU-BACKEND>.onrender.com/api/pacientes/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener datos del paciente");

        const data = await res.json();
        setPaciente(data);
      } catch (error) {
        console.error(error);
        setPaciente(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!paciente) return <div>No se pudo cargar el paciente</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Datos del paciente</h1>
      <p><strong>Nombre:</strong> {paciente.nombre}</p>
      <p><strong>DNI:</strong> {paciente.dni}</p>
      <p><strong>Fecha de nacimiento:</strong> {paciente.fecha_nacimiento}</p>
      {/* Agrega más campos según tu backend */}
    </div>
  );
};

export default Paciente;
