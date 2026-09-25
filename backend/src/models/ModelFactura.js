import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { decimalNumber } from '../utils/decimal.js';

export const Factura = sequelize.define(
  'Factura',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Se asigna justo después de crear la factura (FAC-000001, ...)
    numero: { type: DataTypes.STRING(20), allowNull: true, unique: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    subtotal: decimalNumber('subtotal'),
    iva: decimalNumber('iva'),
    total: decimalNumber('total'),
    estado: {
      type: DataTypes.ENUM('emitida', 'pagada', 'anulada'),
      allowNull: false,
      defaultValue: 'emitida',
    },
    observaciones: { type: DataTypes.TEXT, allowNull: true },
  },
  { tableName: 'facturas' }
);
