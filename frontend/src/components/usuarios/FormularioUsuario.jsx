import React, { useState } from 'react';
import { createUsuario } from './UsuariosApi';

export const FormularioUsuario = ({ onSaved }) => {
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'operador' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsuario(form);
    setForm({ nombre: '', email: '', rol: 'operador' });
    if (onSaved) onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Registrar Usuario del Sistema</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <input className="form-control" placeholder="Nombre Completo" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input className="form-control" type="email" placeholder="Correo Corporativo" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <select className="form-control" value={form.rol} onChange={e => setForm({...form, rol: e.target.value})}>
          <option value="operador">Operador de Facturación</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button type="submit" className="btn-epm" style={{ marginTop: '1rem' }}>Crear Usuario</button>
    </form>
  );
};