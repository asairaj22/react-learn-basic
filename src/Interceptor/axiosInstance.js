import axios from 'axios';
import { useLoading } from '../components/common/LoadingContext';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const useAxiosInterceptors = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
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
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);
};

export default axiosInstance;
export { useAxiosInterceptors };
