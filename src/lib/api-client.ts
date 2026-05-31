import Axios, { type InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications/notifications-store';
import { env } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  config.withCredentials = true;
  return config;
}

/**
 * The single, pre-configured HTTP client. Always import `api` from here — never
 * call `axios`/`fetch` directly in features. The response interceptor unwraps
 * `response.data` and surfaces a notification on error. See docs/api-layer.md.
 */
export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
