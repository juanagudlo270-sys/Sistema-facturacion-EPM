import { sequelize } from '../config/database.js';
import { serverConfig } from '../config/credentials.js';
import { repositoryFactura } from '../repositories/RepositoryFactura.js';
import { repositoryDetalleFactura } from '../repositories/RepositoryDetalleFactura.js';
import { repositoryCliente } from '../repositories/RepositoryCliente.js';
import { repositoryProducto } from '../repositories/RepositoryProducto.js';
import { repositoryUsuario } from '../repositories/RepositoryUsuario.js';
import { AppError } from '../utils/AppError.js';
import { redondear } from '../utils/decimal.js';

const ESTADOS = ['emitida', 'pagada', 'anulada'];

export const ServicioFactura = {
  listar({ estado, clienteId } = {}) {
    const where = {};
    if (estado) {
      if (!ESTADOS.includes(estado)) throw new AppError(`Estado inválido. Use: ${ESTADOS.join(', ')}`);
      where.estado = estado;
    }
    if (clienteId) where.clienteId = clienteId;
    return repositoryFactura.findAll({ where });
  },

  async obtener(id) {
    const factura = await repositoryFactura.findById(id);
    if (!factura) throw new AppError('Factura no encontrada', 404);
    return factura;
  },

  /**
   * Crea la factura completa en UNA transacción:
   * valida cliente y productos, calcula subtotal / IVA / total,
   * descuenta stock y guarda cabecera + detalles. Si algo falla, no se guarda nada.
   *
   * Body esperado:
   * { clienteId, usuarioId?, observaciones?, detalles: [{ productoId, cantidad }] }
   */
  async crear(data = {}) {
    const { clienteId, usuarioId, observaciones, detalles } = data;

    if (!clienteId) throw new AppError('El cliente es obligatorio');
    if (!Array.isArray(detalles) || detalles.length === 0) {
      throw new AppError('La factura debe tener al menos un producto');
    }

    // Une líneas repetidas del mismo producto y valida cantidades
    const lineas = new Map();
    for (const d of detalles) {
      const productoId = Number(d.productoId);
      const cantidad = Number(d.cantidad);
      if (!productoId) throw new AppError('Cada detalle necesita un productoId');
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new AppError('La cantidad debe ser un entero mayor a 0');
      }
      lineas.set(productoId, (lineas.get(productoId) || 0) + cantidad);
    }

    const facturaId = await sequelize.transaction(async (t) => {
      const cliente = await repositoryCliente.findById(clienteId, { transaction: t });
      if (!cliente) throw new AppError('El cliente no existe', 404);
      if (!cliente.activo) throw new AppError('El cliente está inactivo');

      if (usuarioId) {
        const usuario = await repositoryUsuario.findById(usuarioId, { transaction: t });
        if (!usuario) throw new AppError('El usuario no existe', 404);
      }

      const filas = [];
      let subtotal = 0;

      for (const [productoId, cantidad] of lineas) {
        // lock: bloquea la fila para que dos facturas simultáneas no vendan el mismo stock
        const producto = await repositoryProducto.findById(productoId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!producto) throw new AppError(`El producto ${productoId} no existe`, 404);
        if (!producto.activo) throw new AppError(`El producto "${producto.nombre}" está inactivo`);
        if (producto.stock < cantidad) {
          throw new AppError(
            `Stock insuficiente para "${producto.nombre}" (disponible: ${producto.stock}, solicitado: ${cantidad})`
          );
        }

        const precioUnitario = producto.precio;
        const subtotalLinea = redondear(precioUnitario * cantidad);

        await producto.update({ stock: producto.stock - cantidad }, { transaction: t });

        filas.push({ productoId, cantidad, precioUnitario, subtotal: subtotalLinea });
        subtotal += subtotalLinea;
      }

      subtotal = redondear(subtotal);
      const iva = redondear((subtotal * serverConfig.ivaPorcentaje) / 100);
      const total = redondear(subtotal + iva);

      const factura = await repositoryFactura.create(
        { clienteId, usuarioId: usuarioId || null, observaciones, subtotal, iva, total },
        { transaction: t }
      );
      await factura.update(
        { numero: `FAC-${String(factura.id).padStart(6, '0')}` },
        { transaction: t }
      );

      await repositoryDetalleFactura.bulkCreate(
        filas.map((f) => ({ ...f, facturaId: factura.id })),
        { transaction: t }
      );

      return factura.id;
    });

    return repositoryFactura.findById(facturaId);
  },

  // emitida -> pagada
  async pagar(id) {
    await sequelize.transaction(async (t) => {
      const factura = await repositoryFactura.findBasic(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!factura) throw new AppError('Factura no encontrada', 404);
      if (factura.estado !== 'emitida') {
        throw new AppError(`Solo se puede pagar una factura emitida (estado actual: ${factura.estado})`);
      }
      await factura.update({ estado: 'pagada' }, { transaction: t });
    });
    return repositoryFactura.findById(id);
  },

  // emitida -> anulada (devuelve el stock de los productos)
  async anular(id) {
    await sequelize.transaction(async (t) => {
      const factura = await repositoryFactura.findBasic(id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!factura) throw new AppError('Factura no encontrada', 404);
      if (factura.estado !== 'emitida') {
        throw new AppError(`Solo se puede anular una factura emitida (estado actual: ${factura.estado})`);
      }

      const detalles = await repositoryDetalleFactura.findByFacturaId(id, { transaction: t });
      for (const d of detalles) {
        const producto = await repositoryProducto.findById(d.productoId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (producto) await producto.update({ stock: producto.stock + d.cantidad }, { transaction: t });
      }

      await factura.update({ estado: 'anulada' }, { transaction: t });
    });
    return repositoryFactura.findById(id);
  },
};
