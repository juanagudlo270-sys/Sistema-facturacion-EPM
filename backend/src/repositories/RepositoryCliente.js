import { BaseRepository } from './BaseRepository.js';
import { Cliente } from '../models/Relaciones.js';

class RepositoryCliente extends BaseRepository {
  constructor() {
    super(Cliente);
  }

  findAll(options = {}) {
    return this.model.findAll({ order: [['nombre', 'ASC']], ...options });
  }

  findByDocumento(documento, options = {}) {
    return this.model.findOne({ where: { documento }, ...options });
  }
}

export const repositoryCliente = new RepositoryCliente();
