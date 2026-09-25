import axios from 'axios';
const API = 'http://localhost:3000/api/productos';

export const getProductos = () => axios.get(API);
export const createProducto = (data) => axios.post(API, data);