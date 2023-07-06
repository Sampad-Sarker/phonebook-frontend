import axios from "axios";

//for without backend, locally available by using json-server
// const baseUrl = "http://localhost:3001/persons";

//for locally available using backend and frontend repository
// const baseUrl = "http://localhost:3001/api/persons";

//for backend server
const baseUrl = "https://phonebook-backend-n1vk.onrender.com/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteContactDetails = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteContactDetails };
