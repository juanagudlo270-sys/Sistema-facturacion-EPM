import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define(
  'Usuario',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: 'El correo no es válido' } },
    },
    password: { type: DataTypes.STRING(100), allowNull: false },
    rol: { type: DataTypes.ENUM('admin', 'facturador'), allowNull: false, defaultValue: 'facturador' },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: 'usuarios',
    // Por defecto NUNCA se devuelve el hash de la contraseña
    defaultScope: { attributes: { exclude: ['password'] } },
  }
);
