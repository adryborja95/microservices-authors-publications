import axios from "axios";

const API_URL = "http://localhost:8082/publications";

// Crear publicación
export const createPublication = (publication) => {
  return axios.post(API_URL, publication);
};

// Listar todas las publicaciones
export const getAllPublications = () => {
  return axios.get(API_URL);
};

// Obtener publicación por ID
export const getPublicationById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Cambiar estado editorial
export const changePublicationStatus = (id, status) => {
  return axios.patch(`${API_URL}/${id}/status`, null, {
    params: { status },
  });
};
