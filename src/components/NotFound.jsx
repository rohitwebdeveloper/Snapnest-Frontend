import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-900 text-center px-4">
      <img src='./notfound.svg' alt="Not Found" className="w-60 mb-6" />
      <h1 className="text-4xl font-medium text-blue-500 dark:text-blue-400 mb-2">Page Not Found</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
