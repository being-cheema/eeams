import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    await api.get('/user/info/');
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export const getStudentDashboard = async () => {
  const response = await api.get('/student/dashboard/');
  return response.data;
};

export const getStudentPaymentHistory = async () => {
  const response = await api.get('/student/payment/history/');
  return response.data;
};

export const getActivePaymentWindows = async () => {
  const response = await api.get('/student/payment/');
  return response.data;
};

export const submitPayment = async (windowId: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('window_id', windowId.toString());
  formData.append('image_proof', imageFile);
  
  const response = await api.post('/student/payment/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAttendanceReport = async (startDate: string, endDate: string, output: 'pdf' | 'csv' | 'json') => {
  console.log('Fetching attendance report with params:', { startDate, endDate, output });
  
  if (output === 'json') {
    const response = await api.get(`/get-report/?start_date=${startDate}&end_date=${endDate}&output=${output}`);
    console.log('Attendance report response:', response.data);
    return response.data;
  } else {
    const response = await api.get(`/get-report/?start_date=${startDate}&end_date=${endDate}&output=${output}`, {
      responseType: 'blob',
    });
    console.log('Attendance report blob response:', response);
    return response.data;
  }
};

export const getPaymentHistory = async (): Promise<{
  student_name: string;
  email: string;
  payment_history: Array<{
    payment_id: number;
    batch_name: string;
    amount: number;
    status: string;
    date: string;
    window_period: string;
  }>;
  total_payments: number;
  total_paid: number;
}> => {
  const response = await axios.get(`${API_BASE_URL}/student/payment/history/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}; 