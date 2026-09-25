// CRUD genérico. Todos los métodos aceptan `options` (ej. { transaction }) de Sequelize.
export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findAll(options = {}) {
    return this.model.findAll(options);
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  create(data, options = {}) {
    return this.model.create(data, options);
  }

  async update(id, data, options = {}) {
    const registro = await this.model.findByPk(id, options);
    if (!registro) return null;
    return registro.update(data, options);
  }

  async delete(id, options = {}) {
    const registro = await this.model.findByPk(id, options);
    if (!registro) return false;
    await registro.destroy(options);
    return true;
  }
}
