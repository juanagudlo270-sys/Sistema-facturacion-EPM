import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { decimalNumber } from '../utils/decimal.js';

export const DetalleFactura = sequelize.define(
  'DetalleFactura',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    // Se guarda el precio del momento de la venta (el producto puede cambiar de precio después)
    precioUnitario: decimalNumber('precioUnitario'),
    subtotal: decimalNumber('subtotal'),
  },
  { tableName: 'detalle_facturas' }
);
