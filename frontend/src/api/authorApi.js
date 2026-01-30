import axios from "axios";

const API_URL = import.meta.env.VITE_AUTHORS_API;

export const getAllAuthors = () => 
  axios.get(`${API_URL}/authors`);

export const getAuthorById = (id) =>
  axios.get(`${API_URL}/authors/${id}`);

export const createAuthor = (author) =>
  axios.post(`${API_URL}/authors`, author);