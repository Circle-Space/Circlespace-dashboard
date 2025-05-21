import axios, { AxiosInstance } from "axios";
import { apiConfig } from "../config";

class ApiClientUploadFile {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async post<T>(url: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await this.axiosInstance.post<T>(url, formData);
      return response.data;
    } catch (error) {
      throw error; // or handle the error in a way that suits your needs
    }
  }
}

export const apiClientUploadFile = new ApiClientUploadFile(apiConfig.baseUrl);
