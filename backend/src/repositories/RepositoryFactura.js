import { BaseRepository } from './BaseRepository.js';
import { Factura, Cliente, Usuario, DetalleFactura, Producto } from '../models/Relaciones.js';

class RepositoryFactura extends BaseRepository {
  constructor() {
    super(Factura);
  }

  // Listado: cabecera + datos básicos del cliente
  findAll({ where = {}, ...options } = {}) {
    return this.model.findAll({
      where,
      include: [{ model: Cliente, as: 'cliente', attributes: ['id', 'nombre', 'tipoDocumento', 'documento'] }],
      order: [['id', 'DESC']],
      ...options,
    });
  }

  // Detalle completo: cliente, usuario y líneas con su producto
  findById(id, options = {}) {
    return this.model.findByPk(id, {
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] },
        {
          model: DetalleFactura,
          as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['id', 'codigo', 'nombre'] }],
        },
      ],
      order: [[{ model: DetalleFactura, as: 'detalles' }, 'id', 'ASC']],
      ...options,
    });
  }

  // Solo la cabecera (sirve para bloquear la fila dentro de una transacción)
  findBasic(id, options = {}) {
    return this.model.findByPk(id, options);
  }
}

export const repositoryFactura = new RepositoryFactura();
