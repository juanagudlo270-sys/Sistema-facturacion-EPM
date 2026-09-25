import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import { credentials } from './credentials.js';

const { host, port, user, password, database } = credentials;

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
  define: { underscored: true, timestamps: true },
});

// Crea la base de datos si todavía no existe (Sequelize solo crea las tablas)
export async function crearBaseDeDatos() {
  const conexion = await mysql.createConnection({ host, port, user, password });
  await conexion.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conexion.end();
}
