import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

// import { useSelector } from 'react-redux';


const ImageCard = ({imgurl, imgid, className}) => {

  // const imaData = useSelector((state) => state.recent)
  // console.log('recentdata:', imaData)

  return (
    <div className={`relative w-fit   max-h-52  ${className} bg-white rounded-lg shadow-md overflow-hidden border border-gray-200`} >
      {/* <img src='https://images.unsplash.com/photo-1743736750720-5d927199fc15?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
      className="w-full h-full object-cover flex items-center justify-center text-sm text-gray-400" /> */}
      <Link to={`/detail/${imgid}`}>
      <img src={imgurl} alt='no image'  className='max-h-52'/>
      </Link>
    </div>
  );
};

export default ImageCard;
