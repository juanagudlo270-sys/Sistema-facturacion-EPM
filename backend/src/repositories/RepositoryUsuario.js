import { BaseRepository } from './BaseRepository.js';
import { Usuario } from '../models/Relaciones.js';

class RepositoryUsuario extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findAll(options = {}) {
    return this.model.findAll({ order: [['nombre', 'ASC']], ...options });
  }

  // unscoped() para poder leer también el hash de la contraseña (login futuro)
  findByEmail(email, options = {}) {
    return this.model.unscoped().findOne({ where: { email }, ...options });
  }
}

export const repositoryUsuario = new RepositoryUsuario();
