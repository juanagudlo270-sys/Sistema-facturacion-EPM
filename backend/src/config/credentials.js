import dotenv from 'dotenv';
dotenv.config();

export const credentials = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'facturacion_epm',
};

export const serverConfig = {
  port: Number(process.env.PORT) || 3000,
  ivaPorcentaje: Number(process.env.IVA_PORCENTAJE ?? 19),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
