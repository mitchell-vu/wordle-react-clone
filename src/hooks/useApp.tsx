import AppContext from '@/contexts/AppContext';
import * as React from 'react';

const useApp = () => React.useContext(AppContext);

export default useApp;
