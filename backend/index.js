import express from 'express';
import cors from 'cors';
import { serverConfig, credentials } from './src/config/credentials.js';
import { sequelize, crearBaseDeDatos } from './src/config/database.js';
import './src/models/Relaciones.js'; // registra los modelos y sus relaciones antes del sync

import RouterUsuarios from './src/router/RouterUsuarios.js';
import RouterClientes from './src/router/RouterClientes.js';
import RouterProductos from './src/router/RouterProductos.js';
import RouterFacturas from './src/router/RouterFacturas.js';
import { notFound, errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: serverConfig.corsOrigin }));
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'API Facturación EPM funcionando' }));

app.use('/api/usuarios', RouterUsuarios);
app.use('/api/clientes', RouterClientes);
app.use('/api/productos', RouterProductos);
app.use('/api/facturas', RouterFacturas);

app.use(notFound);
app.use(errorHandler);

async function iniciar() {
  try {
    await crearBaseDeDatos();
    await sequelize.authenticate();
    await sequelize.sync(); // crea las tablas si no existen
    console.log(`Base de datos "${credentials.database}" lista`);

    app.listen(serverConfig.port, () => {
      console.log(`Servidor en http://localhost:${serverConfig.port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

iniciar();
