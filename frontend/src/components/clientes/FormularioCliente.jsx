import React, { useState } from 'react';
import { createCliente } from './ClientesApi';

export const FormularioCliente = ({ onSaved }) => {
  const [form, setForm] = useState({ documento: '', nombre: '', email: '', direccion: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCliente(form);
    setForm({ documento: '', nombre: '', email: '', direccion: '' });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Registrar Nuevo Cliente</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input className="form-control" placeholder="Documento / Cédula" value={form.documento} onChange={e => setForm({...form, documento: e.target.value})} required />
        <input className="form-control" placeholder="Nombre Completo" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input className="form-control" placeholder="Correo Electrónico" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="form-control" placeholder="Dirección" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} required />
      </div>
      <button type="submit" className="btn-epm" style={{ marginTop: '1rem' }}>Guardar Cliente</button>
    </form>
  );
};