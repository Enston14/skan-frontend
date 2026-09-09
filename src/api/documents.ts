import axios from 'axios';

const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const documentsAPI = {
  // Запрос для получения информации об аккаунте (GET /account/info)
  async getAccountInfo() {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/account/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Запрос для получения сводки (POST /objectsearch/histograms)
  async searchHistograms(params: any) {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/objectsearch/histograms`, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Запрос для получения списка ID публикаций (POST /objectsearch)
  async searchDocuments(params: any) {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/objectsearch`, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Запрос для получения содержимого документов (POST /documents)
  async getDocuments(ids: string[]) {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/documents`, { ids }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};