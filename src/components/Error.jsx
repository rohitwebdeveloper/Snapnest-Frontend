import React from 'react';
import { Link } from 'react-router-dom';


const Error = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-gray-800 text-center px-4">
      <img src='./error.svg' alt="Error" className="w-60 mb-6" />
      {/* <h1 className="text-4xl font-bold text-red-500 dark:text-red-400 mb-2">Something went wrong</h1> */}
      <p className="text-lg text-red-500 dark:text-gray-200 mb-4">
        {errorMessage || 'An unexpected error occurred.'}
      </p>
      <Link to="/" className="px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition">
        Back to Home
      </Link>
    </div>

  );
};

export default Error;
