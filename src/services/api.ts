import axios from 'axios';
import { ProcessImagesResponse } from '../types';

// Use relative path for API - works with Vercel deployment
const api = axios.create({
  baseURL: '',
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
