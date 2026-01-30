import axios from "axios";

const API_URL = import.meta.env.VITE_PUBLICATIONS_API;

// Crear publicación
export const createPublication = (publication) => 
  axios.post(`${API_URL}/publications`, publication);

// Listar todas las publicaciones
export const getAllPublications = () => 
  axios.get(`${API_URL}/publications`);

// Obtener publicación por ID
export const getPublicationById = (id) => 
  axios.get(`${API_URL}/publications/${id}`);

// Cambiar estado editorial
export const changePublicationStatus = (id, status) => {
  return axios.patch(`${API_URL}/publications/${id}/status`, null, {
    params: { status },
  });
};
