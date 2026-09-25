import { Usuario } from './ModelUsuario.js';
import { Cliente } from './ModelCliente.js';
import { Producto } from './ModelProducto.js';
import { Factura } from './ModelFactura.js';
import { DetalleFactura } from './ModelDetalleFactura.js';

// Cliente 1 — N Factura
Cliente.hasMany(Factura, { foreignKey: { name: 'clienteId', allowNull: false }, as: 'facturas' });
Factura.belongsTo(Cliente, { foreignKey: { name: 'clienteId', allowNull: false }, as: 'cliente' });

// Usuario 1 — N Factura (quién la emitió)
Usuario.hasMany(Factura, { foreignKey: { name: 'usuarioId', allowNull: true }, as: 'facturas' });
Factura.belongsTo(Usuario, { foreignKey: { name: 'usuarioId', allowNull: true }, as: 'usuario' });

// Factura 1 — N DetalleFactura
Factura.hasMany(DetalleFactura, {
  foreignKey: { name: 'facturaId', allowNull: false },
  as: 'detalles',
  onDelete: 'CASCADE',
});
DetalleFactura.belongsTo(Factura, { foreignKey: { name: 'facturaId', allowNull: false }, as: 'factura' });

// Producto 1 — N DetalleFactura
Producto.hasMany(DetalleFactura, { foreignKey: { name: 'productoId', allowNull: false }, as: 'detalles' });
DetalleFactura.belongsTo(Producto, { foreignKey: { name: 'productoId', allowNull: false }, as: 'producto' });

export { Usuario, Cliente, Producto, Factura, DetalleFactura };
