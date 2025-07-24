import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const ShareOption = ({ imageUrl, onClose }) => {
  const encodedUrl = encodeURIComponent(imageUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl);
    toast.success('Link copied to clipboard');
  };


  return (
    <div className="absolute  inset-0 m-auto h-fit w-[calc(100%-50px)] md:w-full  max-w-lg bg-white  rounded-xl shadow-lg z-50 p-3 sm:p-5 md:p-6">
      <div className="flex justify-between items-center border-b-[2px] border-gray-500 pb-2 mb-3">
        <h2 className="text-lg md:text-xl font-medium text-gray-700">Share Image</h2>
        <button onClick={() => onClose(false)}>
          <CloseIcon fontSize="small" className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* URL Copy */}
      <div className="flex items-center bg-gray-100 px-2 py-2 rounded-md text-base text-gray-700 my-8">
        <span className="truncate  flex-1">{imageUrl}</span>
        <button onClick={handleCopy} className="ml-2 text-blue-500 hover:text-blue-600">
          <ContentCopyIcon fontSize="small" />
        </button>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-around items-center text-sm  text-gray-700 mb-4">
        <a
          href={`https://wa.me/?text=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <WhatsAppIcon style={{ color: '#25D366' }} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <FacebookIcon style={{ color: '#2391ff' }} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <XIcon style={{ color: '#444444' }} />
        </a>
      </div>
    </div>
  );
};

export default ShareOption;
