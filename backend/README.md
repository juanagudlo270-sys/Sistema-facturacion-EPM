# Backend — Facturación EPM

API REST con Node.js + Express + Sequelize + MySQL.
Patrón: Model → Repository → Service → Controller → Router.

## Puesta en marcha

```bash
npm install
# revisar .env (usuario/clave de MySQL)
npm run dev
```

Al iniciar crea la base `facturacion_epm` y las tablas automáticamente.

## Endpoints

| Recurso | Endpoints |
|---|---|
| Usuarios | `GET/POST /api/usuarios` · `GET/PUT/DELETE /api/usuarios/:id` |
| Clientes | `GET/POST /api/clientes` · `GET/PUT/DELETE /api/clientes/:id` |
| Productos | `GET/POST /api/productos` · `GET/PUT/DELETE /api/productos/:id` |
| Facturas | `GET/POST /api/facturas` · `GET /api/facturas/:id` · `PATCH /api/facturas/:id/pagar` · `PATCH /api/facturas/:id/anular` |

Filtros: `GET /api/facturas?estado=emitida&clienteId=1`

### Crear factura

```json
POST /api/facturas
{
  "clienteId": 1,
  "usuarioId": 1,
  "observaciones": "Opcional",
  "detalles": [
    { "productoId": 1, "cantidad": 2 },
    { "productoId": 3, "cantidad": 1 }
  ]
}
```

El servidor calcula precios, subtotal, IVA (`IVA_PORCENTAJE`, 19 % por defecto), total y descuenta el stock.
