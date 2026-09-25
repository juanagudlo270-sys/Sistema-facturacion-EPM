import bcrypt from 'bcryptjs';
import { repositoryUsuario } from '../repositories/RepositoryUsuario.js';
import { AppError } from '../utils/AppError.js';
import { pick } from '../utils/pick.js';

const CAMPOS = ['nombre', 'email', 'password', 'rol', 'activo'];
const ROLES = ['admin', 'facturador'];

const validarRol = (rol) => {
  if (rol !== undefined && !ROLES.includes(rol)) {
    throw new AppError(`El rol debe ser uno de: ${ROLES.join(', ')}`);
  }
};

export const ServicioUsuario = {
  listar() {
    return repositoryUsuario.findAll();
  },

  async obtener(id) {
    const usuario = await repositoryUsuario.findById(id);
    if (!usuario) throw new AppError('Usuario no encontrado', 404);
    return usuario;
  },

  async crear(data) {
    const datos = pick(data, CAMPOS);
    if (!datos.nombre || !datos.email || !datos.password) {
      throw new AppError('Nombre, correo y contraseña son obligatorios');
    }
    if (String(datos.password).length < 6) {
      throw new AppError('La contraseña debe tener al menos 6 caracteres');
    }
    validarRol(datos.rol);
    if (await repositoryUsuario.findByEmail(datos.email)) {
      throw new AppError('Ya existe un usuario con ese correo', 409);
    }
    datos.password = await bcrypt.hash(String(datos.password), 10);
    const creado = await repositoryUsuario.create(datos);
    // Se vuelve a consultar para no devolver el hash de la contraseña
    return repositoryUsuario.findById(creado.id);
  },

  async actualizar(id, data) {
    const usuario = await this.obtener(id);
    const datos = pick(data, CAMPOS);
    validarRol(datos.rol);

    if (datos.email && datos.email !== usuario.email) {
      if (await repositoryUsuario.findByEmail(datos.email)) {
        throw new AppError('Ya existe un usuario con ese correo', 409);
      }
    }
    if (datos.password !== undefined) {
      if (String(datos.password).length < 6) {
        throw new AppError('La contraseña debe tener al menos 6 caracteres');
      }
      datos.password = await bcrypt.hash(String(datos.password), 10);
    }
    await repositoryUsuario.update(id, datos);
    return repositoryUsuario.findById(id);
  },

  async eliminar(id) {
    const eliminado = await repositoryUsuario.delete(id);
    if (!eliminado) throw new AppError('Usuario no encontrado', 404);
    return { mensaje: 'Usuario eliminado' };
  },
};
