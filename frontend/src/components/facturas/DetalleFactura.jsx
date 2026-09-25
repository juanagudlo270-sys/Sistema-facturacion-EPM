import React, { useEffect, useState } from 'react';
import { getFacturaById } from './FacturasApi';

export const DetalleFactura = ({ facturaId, onVolver }) => {
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    if (facturaId) {
      getFacturaById(facturaId).then((res) => setFactura(res.data));
    }
  }, [facturaId]);

  if (!factura) return <div className="card">Cargando detalle de la factura...</div>;

  return (
    <div className="card" style={{ borderTop: '5px solid var(--epm-green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Factura de Servicios Públicos N° FACT-{factura.id}</h2>
        <button onClick={onVolver} className="btn-epm" style={{ backgroundColor: 'var(--epm-blue)' }}>
          ← Volver al Listado
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <h4>Datos del Cliente</h4>
          <p><strong>Nombre:</strong> {factura.cliente?.nombre}</p>
          <p><strong>Documento/NIT:</strong> {factura.cliente?.documento}</p>
          <p><strong>Dirección:</strong> {factura.cliente?.direccion}</p>
          <p><strong>Correo:</strong> {factura.cliente?.email}</p>
        </div>
        <div>
          <h4>Datos del Comprobante</h4>
          <p><strong>Fecha de Emisión:</strong> {factura.fecha}</p>
          <p><strong>Estado:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{factura.estado}</span></p>
        </div>
      </div>

      <h4 style={{ marginTop: '1.5rem' }}>Detalle de Consumos</h4>
      <table className="epm-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Servicio / Concepto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {factura.detalles?.map((d) => (
            <tr key={d.id}>
              <td>{d.producto?.codigo}</td>
              <td>{d.producto?.nombre}</td>
              <td>{d.cantidad}</td>
              <td>${Number(d.precioUnitario).toLocaleString()}</td>
              <td>${Number(d.subtotal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
        <h3>Total A Pagar: ${Number(factura.total).toLocaleString()} COP</h3>
      </div>
    </div>
  );
};