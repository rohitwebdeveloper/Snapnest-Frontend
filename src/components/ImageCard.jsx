import React from 'react';

const ImageCard = ({ imgurl, className }) => {

  return (
    <div className={`relative w-fit max-h-52  ${className} bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border dark:border-gray-700 border-gray-200`} >
      <img src={imgurl} alt='Image' className='min-h-[120px] max-h-32 sm:min-h-36  md:min-h-40  lg:min-h-44 xl:min-h-48 xl:max-h-52' />
    </div>
  );
};

export default ImageCard;
