import axios from "axios";

const api = axios.create({
  baseURL: "https://ocupasaludlab-backend.onrender.com/api/",
});

// Agregar token automáticamente a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo automático de refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post("https://ocupasaludlab-backend.onrender.com/api/token/refresh/", {
            refresh,
          });

          localStorage.setItem("access", res.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
