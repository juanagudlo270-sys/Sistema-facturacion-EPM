import { BaseRepository } from './BaseRepository.js';
import { Producto } from '../models/Relaciones.js';

class RepositoryProducto extends BaseRepository {
  constructor() {
    super(Producto);
  }

  findAll(options = {}) {
    return this.model.findAll({ order: [['nombre', 'ASC']], ...options });
  }

  findByCodigo(codigo, options = {}) {
    return this.model.findOne({ where: { codigo }, ...options });
  }
}

export const repositoryProducto = new RepositoryProducto();
