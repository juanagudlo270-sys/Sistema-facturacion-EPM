import React, { useEffect, useState } from 'react';
import { getFacturas } from './FacturasApi';
import { FormularioFactura } from './FormularioFactura';

export const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([]);

  const cargar = async () => {
    const res = await getFacturas();
    setFacturas(res.data);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <FormularioFactura onCreated={cargar} />
      <div className="card">
        <h3>Histórico de Facturación EPM</h3>
        <table className="epm-table">
          <thead>
            <tr>
              <th># Factura</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map(f => (
              <tr key={f.id}>
                <td>FACT-{f.id}</td>
                <td>{f.cliente?.nombre}</td>
                <td>{f.fecha}</td>
                <td><strong>${Number(f.total).toLocaleString()}</strong></td>
                <td><span style={{ color: 'green', fontWeight: 'bold' }}>{f.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};