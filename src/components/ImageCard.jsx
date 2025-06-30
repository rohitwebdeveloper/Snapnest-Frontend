import React from 'react';

const ImageCard = ({ imgurl, className }) => {

  return (
    <div className={`relative w-fit   max-h-52  ${className} bg-white rounded-lg shadow-md overflow-hidden border border-gray-200`} >
      <img src={imgurl} alt='no image' className='max-h-52' />
    </div>
  );
};

export default ImageCard;
