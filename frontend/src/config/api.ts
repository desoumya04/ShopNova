import axios from "axios";
const api_path = `${import.meta.env.VITE_BACKEND_URL}/api/v1`; ;

export const api = axios.create({
  baseURL: api_path,
  withCredentials: true,
  
});

// No request interceptor needed — the cookie is sent automatically with withCredentials: true

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Don't redirect on 401 for auth/profile check requests — route guards and components handle those
    const requestUrl = error.config?.url || "";
    const skipRedirectPaths = ["/auth/check", "/auth/logout", "/user/profile", "/cart"];
    const shouldSkip = skipRedirectPaths.some((path) => requestUrl.includes(path));

    if ((error.response?.status === 401 || error.response?.status === 404) && !shouldSkip) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
