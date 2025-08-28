import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('accessToken', response.data.accessToken);
          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then((res) => res.data),
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data).then((res) => res.data),
  logout: () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return api.post('/auth/logout', { refreshToken }).then((res) => res.data);
  },
};

export const lawyerApi = {
  getAll: (q?: string) => api.get('/lawyers', { params: q ? { q } : undefined }).then((res) => res.data),
  getById: (id: string) => api.get(`/lawyers/${id}`).then((res) => res.data),
  update: (id: string, data: any) => api.put(`/lawyers/${id}`, data).then((res) => res.data),
};

export const consultationApi = {
  create: (data: any) => api.post('/consultations', data).then((res) => res.data),
  getByClient: (clientId: string) => api.get(`/consultations/client/${clientId}`).then((res) => res.data),
  getByLawyer: (lawyerId: string) => api.get(`/consultations/lawyer/${lawyerId}`).then((res) => res.data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/consultations/${id}/status`, { status }).then((res) => res.data),
};

export default api;


