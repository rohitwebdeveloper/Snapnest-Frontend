// components/NoData.jsx
import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import FolderOffIcon from '@mui/icons-material/FolderOff';

const NoData = ({ message = "No Data Found", type = "image" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center p-4 text-gray-700 dark:text-gray-300">
      <div className="p-6 rounded-full bg-blue-50 dark:bg-gray-800">
        {type === 'image' ? (
          <ImageIcon style={{ fontSize: 70, color: '#3b82f6' }} />
        ) : (
          <FolderOffIcon style={{ fontSize: 70, color: '#3b82f6' }} />
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-4">{message}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Try adding some {type === 'image' ? 'photos' : 'items'} to see them here.
      </p>
    </div>
  );
};

export default NoData;
