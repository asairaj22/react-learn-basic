import React, { createContext, useContext, useState } from 'react';
import ToastPopup from './toast';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
  };

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ show: false, body: '', bg: '' });

    const showToast = (body, bg = 'primary') => {
        setToast({ show: true, body, bg });
        console.log('Toast state:', { show: true, body, bg });
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastPopup show={toast.show} setShow={(show) => setToast({ ...toast, show })} body={toast.body} bg={toast.bg} />
        </ToastContext.Provider>
    );
};
