import React, { useState } from 'react';
import { createProducto } from './ProductosApi';

export const FormularioProducto = ({ onSaved }) => {
  const [form, setForm] = useState({ codigo: '', nombre: '', precio: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducto(form);
      setForm({ codigo: '', nombre: '', precio: '' });
      if (onSaved) onSaved();
    } catch (error) {
      alert('Error al crear el producto/servicio: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Registrar Servicio o Producto EPM</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Código del Servicio:</label>
          <input
            className="form-control"
            placeholder="Ej. ENER-01"
            value={form.codigo}
            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre del Servicio:</label>
          <input
            className="form-control"
            placeholder="Ej. Energía Residencial"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio Unitario ($):</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            placeholder="Ej. 12000"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn-epm" style={{ marginTop: '1rem' }}>
        Guardar Producto / Servicio
      </button>
    </form>
  );
};