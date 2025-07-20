const Loader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-screen bg-transparent dark:bg-gray-900 transition-colors duration-500">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-5 border-t-blue-500 border-b-blue-100 border-l-blue-100 border-r-blue-100 animate-spin"></div>
        <img src="/favicon.png" alt="loading" className="h-9 z-10" />
      </div>

      <p className="mt-4 text-gray-800 dark:text-gray-400 text-lg font-medium animate-pulse">
        Just a moment...
      </p>
    </div>
  );
};


export default Loader