import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Cliente = sequelize.define(
  'Cliente',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    tipoDocumento: {
      type: DataTypes.ENUM('CC', 'NIT', 'CE', 'TI', 'PASAPORTE'),
      allowNull: false,
      defaultValue: 'CC',
    },
    documento: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(120), allowNull: true, validate: { isEmail: { msg: 'El correo no es válido' } } },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    direccion: { type: DataTypes.STRING(200), allowNull: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: 'clientes' }
);
