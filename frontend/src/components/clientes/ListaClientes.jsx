import React, { useEffect, useState } from 'react';
import { getClientes } from './ClientesApi';
import { FormularioCliente } from './FormularioCliente';

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  const cargar = async () => {
    const res = await getClientes();
    setClientes(res.data);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <FormularioCliente onSaved={cargar} />
      <div className="card">
        <h3>Directorio de Clientes</h3>
        <table className="epm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.documento}</td>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};