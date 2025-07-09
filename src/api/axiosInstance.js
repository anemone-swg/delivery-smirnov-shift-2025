import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://shift-intensive.ru",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Сетевая ошибка:", error.message);
    } else {
      const status = error.response.status;
      const errorMessage = error.response.data?.reason || "Ошибка сервера";
      console.error("Ошибка:", status, errorMessage);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
