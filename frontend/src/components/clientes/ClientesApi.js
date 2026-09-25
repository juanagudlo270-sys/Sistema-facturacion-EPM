import axios from 'axios';
const API = 'http://localhost:3000/api/clientes';

export const getClientes = () => axios.get(API);
export const createCliente = (data) => axios.post(API, data);