import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Loader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-screen bg-transparent dark:bg-gray-900 transition-colors duration-500">
      <div className="relative flex items-center justify-center w-32 h-32">
        <AutorenewIcon className="animate-spin text-blue-500 text-6xl absolute" style={{ fontSize: '80px' }} />
        <div className="absolute text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulseText">
          SnapNest
        </div>
      </div>
      <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg font-medium animate-pulse">Just a moment...</p>
    </div>
  );
};

export default Loader;
