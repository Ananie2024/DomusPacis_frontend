import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api') + '/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token') ||
                  (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refresh_token') ||
                             (typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null);

        if (!refreshToken) {
          if (typeof window !== 'undefined') {
            Cookies.remove('access_token');
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const newToken = data.data?.accessToken || data.accessToken;

        Cookies.set('access_token', newToken, { expires: 1, secure: true, sameSite: 'none' });
        if (typeof window !== 'undefined') localStorage.setItem('access_token', newToken);

        if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
        }

        return apiClient(originalRequest);
      } catch {
        if (typeof window !== 'undefined') {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;