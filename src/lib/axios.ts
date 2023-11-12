/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-expect-error - we're redefining the AxiosInstance interface
import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '~/config';

/**
 * Axios instance with base URL set to the API URL.
 *
 * Unwraps the response data from the server.
 */
export const request = axios.create({
  baseURL: API_URL,
});

// Note: Instead if 'axios' which might cause issues with the auto-import,
// We should call it 'axiosInstance', or 'api' or something else.

request.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}
