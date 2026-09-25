import { repositoryProducto } from '../repositories/RepositoryProducto.js';
import { AppError } from '../utils/AppError.js';
import { pick } from '../utils/pick.js';

const CAMPOS = ['codigo', 'nombre', 'descripcion', 'precio', 'stock', 'activo'];

const validarNumeros = ({ precio, stock }) => {
  if (precio !== undefined && (Number.isNaN(Number(precio)) || Number(precio) < 0)) {
    throw new AppError('El precio debe ser un número mayor o igual a 0');
  }
  if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
    throw new AppError('El stock debe ser un entero mayor o igual a 0');
  }
};

export const ServicioProducto = {
  listar() {
    return repositoryProducto.findAll();
  },

  async obtener(id) {
    const producto = await repositoryProducto.findById(id);
    if (!producto) throw new AppError('Producto no encontrado', 404);
    return producto;
  },

  async crear(data) {
    const datos = pick(data, CAMPOS);
    if (!datos.codigo || !datos.nombre || datos.precio === undefined) {
      throw new AppError('Código, nombre y precio son obligatorios');
    }
    validarNumeros(datos);
    if (await repositoryProducto.findByCodigo(datos.codigo)) {
      throw new AppError('Ya existe un producto con ese código', 409);
    }
    return repositoryProducto.create(datos);
  },

  async actualizar(id, data) {
    const producto = await this.obtener(id);
    const datos = pick(data, CAMPOS);
    validarNumeros(datos);
    if (datos.codigo && datos.codigo !== producto.codigo) {
      if (await repositoryProducto.findByCodigo(datos.codigo)) {
        throw new AppError('Ya existe un producto con ese código', 409);
      }
    }
    return producto.update(datos);
  },

  async eliminar(id) {
    // Si el producto ya está en facturas, la BD lo impide y el errorHandler responde 409
    const eliminado = await repositoryProducto.delete(id);
    if (!eliminado) throw new AppError('Producto no encontrado', 404);
    return { mensaje: 'Producto eliminado' };
  },
};
