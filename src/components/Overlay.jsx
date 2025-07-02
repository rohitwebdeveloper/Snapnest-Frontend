import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const Overlay = ({ title, children, onClose }) => (
   <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">

        <div className="bg-white border border-gray-600 w-full max-w-96 rounded-xl py-6 relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                <CloseIcon />
            </button>
            <h2 className="text-2xl font-medium px-6 text-gray-800 mb-6">{title}</h2>
            {children}
        </div>
    </div>
);

export default Overlay;