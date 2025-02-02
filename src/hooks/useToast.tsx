import ToastContext from '@/contexts/ToastProvider';
import * as React from 'react';

const useToast = () => React.useContext(ToastContext);

export default useToast;
