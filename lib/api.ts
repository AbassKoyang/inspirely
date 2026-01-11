import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: () => void) {
  refreshSubscribers.push(cb);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh/");
        isRefreshing = false;
        onRefreshed();
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

