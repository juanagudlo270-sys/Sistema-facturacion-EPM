import axios from 'axios';
const API = 'http://localhost:3000/api/facturas';

export const getFacturas = () => axios.get(API);
export const getFacturaById = (id) => axios.get(`${API}/${id}`);
export const createFactura = (data) => axios.post(API, data);