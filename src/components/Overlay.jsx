import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const Overlay = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                <CloseIcon />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
            {children}
        </div>
    </div>
);

export default Overlay;