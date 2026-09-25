import { DataTypes } from 'sequelize';

// MySQL devuelve los DECIMAL como string; este helper los convierte a Number
export const decimalNumber = (campo, precision = 12, escala = 2) => ({
  type: DataTypes.DECIMAL(precision, escala),
  allowNull: false,
  defaultValue: 0,
  get() {
    const valor = this.getDataValue(campo);
    return valor === null ? null : Number(valor);
  },
});

export const redondear = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
