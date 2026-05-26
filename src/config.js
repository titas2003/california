export const API_URL = 'http://localhost:5005/api';
export const getHeaders = () => {
  const token = localStorage.getItem('cust_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};
