import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#007bff', color: 'white' }}>
      <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Login</Link>
      <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
    </nav>
  );
}

export default Navbar;
