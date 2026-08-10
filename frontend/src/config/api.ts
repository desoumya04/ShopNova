import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true,
  
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);



