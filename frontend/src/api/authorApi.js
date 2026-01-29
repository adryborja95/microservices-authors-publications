import axios from "axios";

const API_URL = "http://localhost:8081/authors";

export const getAllAuthors = () => axios.get(API_URL);

export const getAuthorById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createAuthor = (author) =>
  axios.post(API_URL, author);