import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Lista simulada de pacientes
  const pacientes = [
    { id: "12345678", nombre: "Juan Pérez" },
    { id: "87654321", nombre: "Ana García" },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel Principal</h2>
      <p>Bienvenido al sistema OcupasaludLab.</p>
      <h1 className="text-4xl text-blue-600 font-bold">¡Bienvenido a Ocupasalud!</h1>

      <div style={{ marginTop: '2rem' }}>
        <h3 className="text-xl font-semibold">Pacientes:</h3>
        {pacientes.map((paciente) => (
          <div key={paciente.id} style={{ margin: '1rem 0' }}>
            <span className="text-lg">{paciente.nombre} - {paciente.id}</span>
            <Link to={`/paciente/${paciente.id}`}>
              <button
                style={{
                  marginLeft: '10px',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Ver paciente
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
