
import React, { useEffect, useState } from 'react';
import { getUsuarios } from './UsuariosApi';
import { FormularioUsuario } from './FormularioUsuario';

export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargar = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <FormularioUsuario onSaved={cargar} />
      <div className="card">
        <h3>Usuarios del Sistema EPM</h3>
        <table className="epm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};