import React from 'react';

const ImageCard = ({ imgurl, className }) => {

  return (
    <div className={`relative w-fit   max-h-52  ${className} bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border dark:border-gray-700 border-gray-200`} >
      <img src={imgurl} alt='no image' className='max-h-52' loading='lazy' />
    </div>
  );
};

export default ImageCard;
