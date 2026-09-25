import React, { useState } from 'react';
import './App.css';
import { ListaClientes } from './components/clientes/ListaClientes';
import { ListaProductos } from './components/productos/ListaProductos';
import { ListaFacturas } from './components/facturas/ListaFacturas';

export default function App() {
  const [tab, setTab] = useState('facturas');

  return (
    <div className="app-container">
      <header className="epm-header">
        <h2>Empresas Públicas de Medellín — Sistema de Facturación</h2>
        <span>EPM S.A. E.S.P.</span>
      </header>

      <nav className="nav-tabs">
        <button className={`nav-tab ${tab === 'facturas' ? 'active' : ''}`} onClick={() => setTab('facturas')}>Facturación</button>
        <button className={`nav-tab ${tab === 'clientes' ? 'active' : ''}`} onClick={() => setTab('clientes')}>Clientes</button>
        <button className={`nav-tab ${tab === 'productos' ? 'active' : ''}`} onClick={() => setTab('productos')}>Servicios/Productos</button>
      </nav>

      <main className="main-content">
        {tab === 'facturas' && <ListaFacturas />}
        {tab === 'clientes' && <ListaClientes />}
        {tab === 'productos' && <ListaProductos />}
      </main>
    </div>
  );
}