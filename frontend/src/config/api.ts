import axios from "axios";
const api_path = `${import.meta.env.VITE_BACKEND_URL}/api/v1`; ;

export const api = axios.create({
  baseURL: api_path,
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



