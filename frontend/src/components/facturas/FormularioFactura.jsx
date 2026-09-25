import React, { useState, useEffect } from 'react';
import { getClientes } from '../clientes/ClientesApi';
import { getProductos } from '../productos/ProductosApi';
import { createFactura } from './FacturasApi';

export const FormularioFactura = ({ onCreated }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [items, setItems] = useState([{ productoId: '', cantidad: 1 }]);

  useEffect(() => {
    getClientes().then(res => setClientes(res.data));
    getProductos().then(res => setProductos(res.data));
  }, []);

  const handleAddItem = () => setItems([...items, { productoId: '', cantidad: 1 }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clienteId || items.some(i => !i.productoId)) return alert('Completa todos los campos');
    await createFactura({ clienteId, items });
    setClienteId('');
    setItems([{ productoId: '', cantidad: 1 }]);
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Emitir Factura de Servicios Públicos EPM</h3>
      
      <div className="form-group">
        <label>Seleccionar Cliente:</label>
        <select className="form-control" value={clienteId} onChange={e => setClienteId(e.target.value)} required>
          <option value="">-- Seleccionar --</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} ({c.documento})</option>)}
        </select>
      </div>

      <h4>Detalle de Consumos / Servicios</h4>
      {items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <select className="form-control" style={{ flex: 2 }} value={item.productoId} onChange={e => handleItemChange(idx, 'productoId', e.target.value)} required>
            <option value="">-- Seleccionar Servicio --</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (${p.precio})</option>)}
          </select>
          <input className="form-control" style={{ flex: 1 }} type="number" min="1" value={item.cantidad} onChange={e => handleItemChange(idx, 'cantidad', e.target.value)} required />
        </div>
      ))}

      <button type="button" onClick={handleAddItem} style={{ marginBottom: '1rem', cursor: 'pointer' }}>+ Agregar Ítem</button>
      <br />
      <button type="submit" className="btn-epm">Generar Factura Oficial</button>
    </form>
  );
};