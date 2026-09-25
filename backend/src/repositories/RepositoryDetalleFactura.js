import { BaseRepository } from './BaseRepository.js';
import { DetalleFactura } from '../models/Relaciones.js';

class RepositoryDetalleFactura extends BaseRepository {
  constructor() {
    super(DetalleFactura);
  }

  bulkCreate(filas, options = {}) {
    return this.model.bulkCreate(filas, options);
  }

  findByFacturaId(facturaId, options = {}) {
    return this.model.findAll({ where: { facturaId }, ...options });
  }
}

export const repositoryDetalleFactura = new RepositoryDetalleFactura();
