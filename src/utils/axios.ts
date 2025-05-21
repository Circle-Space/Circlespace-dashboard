import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig } from "../config";
import { ResponseCode } from '../types/apiResponse';

class ApiClient {
  public axiosInstance: AxiosInstance;
  public tokenSet = false;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async getResponse<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  async postcfg<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  setBearerToken(tokenString: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenString}`;
    this.tokenSet = true;
  }

  deleteBearerToken() {
    delete this.axiosInstance.defaults.headers.common.Authorization;
    this.tokenSet = false;
  }

  checkRespCode(code: ResponseCode, errorCallback: () => void) {
    if (code === ResponseCode.ERROR) {
      errorCallback();
    }
  }
}

export const apiClient = new ApiClient(apiConfig.baseUrl);
