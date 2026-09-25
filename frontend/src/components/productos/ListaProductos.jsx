import React, { useEffect, useState } from 'react';
import { getProductos, createProducto } from './ProductosApi';

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ codigo: '', nombre: '', precio: '' });

  const cargar = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProducto(form);
    setForm({ codigo: '', nombre: '', precio: '' });
    cargar();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="card">
        <h3>Registrar Servicio/Producto EPM</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <input className="form-control" placeholder="Código (ej. ENER-01)" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required />
          <input className="form-control" placeholder="Nombre Servicio" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
          <input className="form-control" type="number" placeholder="Precio Unitario" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
        </div>
        <button type="submit" className="btn-epm" style={{ marginTop: '1rem' }}>Guardar Producto</button>
      </form>

      <div className="card">
        <h3>Servicios de Servicios Públicos Disponibles</h3>
        <table className="epm-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Servicio</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${Number(p.precio).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};