import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * Экземпляр axios с предустановленным базовым URL.
 * Используется для всех сетевых запросов к API Shift Intensive.
 */

const axiosInstance = axios.create({
  baseURL: "https://shift-intensive.ru",
});

/**Структура ошибки, возвращаемая сервером*/
interface ErrorResponse {
  /** Причина ошибки, отправленная с сервера */
  reason: string;
}

/**
 * Перехватчик ответов для обработки ошибок.
 * - Логирует сетевые ошибки (например, отсутствие соединения).
 * - Логирует ошибки от сервера с HTTP-статусом и сообщением.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
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
