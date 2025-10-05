import axios from 'axios';
import { ProcessImagesResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const ocrApi = {
  processImages: async (files: File[]): Promise<ProcessImagesResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await api.post<ProcessImagesResponse>('/api/ocr/process', formData);
    return response.data;
  },

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get('/api/ocr/health');
    return response.data;
  },
};
