import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { decimalNumber } from '../utils/decimal.js';

export const Producto = sequelize.define(
  'Producto',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    precio: { ...decimalNumber('precio'), validate: { min: 0 } },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: 'productos' }
);
