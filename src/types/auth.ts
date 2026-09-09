import axios from 'axios';

const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const authAPI = {
  async login(login: string, password: string) {
    const response = await axios.post(`${API_URL}/account/login`, {
      login,
      password,
    });
    return response.data; // { accessToken, expire }
  },
};