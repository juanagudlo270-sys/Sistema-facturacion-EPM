import axios from 'axios';
const API = 'http://localhost:3000/api/usuarios';

export const getUsuarios = () => axios.get(API);
export const createUsuario = (data) => axios.post(API, data);