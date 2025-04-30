import axios from 'axios';

export const API_BASE_URL = 'https://attendance-system-ynxq.onrender.com/api';

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

export const getActivePaymentWindows = async (): Promise<{
  payment_windows: Array<{
    window_id: number;
    batch_name: string;
    start_date: string;
    end_date: string;
    amount: number;
    payment_status: string;
    payment_id: number | null;
  }>;
  total_pending_fee: number;
}> => {
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

// Teacher API functions
export const getTeacherDashboard = async () => {
  const response = await axios.get(`${API_BASE_URL}/teacher/dashboard/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getBatchStudents = async (batchId: number) => {
  const response = await axios.get(`${API_BASE_URL}/teacher/batch/${batchId}/students/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const markAttendance = async (data: {
  batch_id: number;
  date: string;
  attendance: Array<{
    student_id: number;
    status: 'P' | 'A' | 'L';
    remarks: string;
  }>;
  class_remark?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/teacher/attendance/mark/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getTeacherAttendanceReports = async (params: {
  view: 'daily' | 'monthly';
  month: string;
  batch?: string;
  search?: string;
  out?: 'json' | 'csv' | 'pdf';
}) => {
  const { view, month, batch, search, out = 'json' } = params;
  // Extract year and month from the full date if provided
  const monthParam = month.split('-').slice(0, 2).join('-');
  
  const response = await axios.get(`${API_BASE_URL}/teacher/attendance/reports/`, {
    params: {
      view,
      month: monthParam,
      ...(batch && batch !== 'all' && { batch }),
      ...(search && { search }),
      ...(out !== 'json' && { out })
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...(out === 'pdf' && { responseType: 'blob' })
  });

  if (out === 'pdf') {
    return response.data;
  }
  
  return response.data;
};

export const getTodayAttendance = async () => {
  const response = await axios.get(`${API_BASE_URL}/attendance/today/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getUserInfo = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/info/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const exportAttendanceReport = async (params: {
  view: 'daily' | 'monthly';
  month: string;
  out: 'pdf' | 'csv';
  batch?: string;
  search?: string;
}) => {
  const { view, month, out, batch, search } = params;
  // Extract year and month from the full date if provided
  const monthParam = month.split('-').slice(0, 2).join('-');
  
  const response = await axios.get(`${API_BASE_URL}/teacher/attendance/export/`, {
    params: {
      view,
      month: monthParam,
      out,
      ...(batch && batch !== 'all' && { batch }),
      ...(search && { search })
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    responseType: 'blob'
  });
  
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await api.post('/users/password-reset/', { email });
  return response.data;
};

export const confirmPasswordReset = async (uid: string, token: string, newPassword: string) => {
  const response = await api.post('/users/password-reset/confirm/', {
    uid,
    token,
    new_password: newPassword
  });
  return response.data;
}; 