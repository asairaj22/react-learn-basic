import axios from 'axios';
import { useLoading } from '../components/common/LoadingContext';
import { useToast } from '../components/common/ToastContext';
import { useEffect } from 'react';

const axiosInterceptor = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const useAxiosInterceptors = () => {
  const { setLoading } = useLoading();
  const showToast = useToast();

  useEffect(() => {
    const requestInterceptor = axiosInterceptor.interceptors.request.use(
      (config) => {
        setLoading(true);
        const accessToken = JSON.parse(localStorage.getItem('token'));
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        setLoading(false);
        showToast(error.toString(), 'danger');
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInterceptor.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        showToast(error.toString(), 'danger');
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInterceptor.interceptors.request.eject(requestInterceptor);
      axiosInterceptor.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading, showToast]);
};

export default axiosInterceptor;
export { useAxiosInterceptors };
