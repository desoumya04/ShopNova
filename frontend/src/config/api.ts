import axios from "axios";
import path from "path";
import env from "dotenv";
env.config({ path: path.resolve( "../../.env") });

const api_path = process.env.BACKEND_URL ;

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



