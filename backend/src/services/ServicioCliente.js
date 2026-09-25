import { repositoryCliente } from '../repositories/RepositoryCliente.js';
import { AppError } from '../utils/AppError.js';
import { pick } from '../utils/pick.js';

const CAMPOS = ['nombre', 'tipoDocumento', 'documento', 'email', 'telefono', 'direccion', 'activo'];

export const ServicioCliente = {
  listar() {
    return repositoryCliente.findAll();
  },

  async obtener(id) {
    const cliente = await repositoryCliente.findById(id);
    if (!cliente) throw new AppError('Cliente no encontrado', 404);
    return cliente;
  },

  async crear(data) {
    const datos = pick(data, CAMPOS);
    if (!datos.nombre || !datos.documento) {
      throw new AppError('Nombre y documento son obligatorios');
    }
    if (await repositoryCliente.findByDocumento(datos.documento)) {
      throw new AppError('Ya existe un cliente con ese documento', 409);
    }
    return repositoryCliente.create(datos);
  },

  async actualizar(id, data) {
    const cliente = await this.obtener(id);
    const datos = pick(data, CAMPOS);
    if (datos.documento && datos.documento !== cliente.documento) {
      if (await repositoryCliente.findByDocumento(datos.documento)) {
        throw new AppError('Ya existe un cliente con ese documento', 409);
      }
    }
    return cliente.update(datos);
  },

  async eliminar(id) {
    // Si el cliente ya tiene facturas, la BD lo impide y el errorHandler responde 409
    const eliminado = await repositoryCliente.delete(id);
    if (!eliminado) throw new AppError('Cliente no encontrado', 404);
    return { mensaje: 'Cliente eliminado' };
  },
};
