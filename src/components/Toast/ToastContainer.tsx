import { useToast } from '@/provider/ToastProvider';
import React from 'react';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { message, isVisible } = useToast();

  return <Toast show={isVisible} message={message || ''} />;
};

export default ToastContainer;
