// AccountSettingsPage.jsx
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Overlay from '../components/Overlay';
import { useSelector } from 'react-redux';



const Account = () => {
    const [showUploadOverlay, setShowUploadOverlay] = useState(false);
    const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const {name, email, avatar} = useSelector((state) => state.auth.user)
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-blue-100 px-6 py-10 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className='text-4xl font-medium text-gray-900 border-b-2 border-blue-200 pb-4 mb-6'>Account Settings</h1>
                <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">

                    {/* Profile Section */}
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-semibold shadow-md">
                            R
                            <button
                                onClick={() => setShowUploadOverlay(true)}
                                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                            >
                                <EditIcon fontSize="small" className="text-black" />
                            </button>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{name}</p>
                            <p className="text-gray-500 text-sm">{email}</p>
                        </div>
                    </div>

                    {/* Settings List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <button
                            onClick={() => setShowPasswordOverlay(true)}
                            className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition shadow-sm text-left text-sm font-medium text-blue-800"
                        >
                            <PasswordIcon /> Change Password
                        </button>
                        <button className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition shadow-sm text-left text-sm font-medium text-blue-800">
                            <LogoutIcon /> Logout
                        </button>
                        <button
                            onClick={() => setShowDeleteOverlay(true)}
                            className="w-full p-4  rounded-xl bg-red-50 hover:bg-red-100 transition shadow-sm text-left text-sm font-medium text-red-700"
                        >
                            <PersonOffIcon /> Delete Account
                        </button>
                        <button
                            onClick={() => setShowFeedback(true)}
                            className="w-full p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition shadow-sm text-left text-sm font-medium text-blue-800"
                        >
                            Help & feedback
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Image Overlay */}
            {showUploadOverlay && (
                <Overlay title="Upload Profile Image" onClose={() => setShowUploadOverlay(false)}>
                    <div className="space-y-4">
                        <input type="file" className="w-full border rounded px-3 py-2" />
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                            Save
                        </button>
                    </div>
                </Overlay>
            )}

            {/* Change Password Overlay */}
            {showPasswordOverlay && (
                <Overlay title="Change Password" onClose={() => setShowPasswordOverlay(false)}>
                    <div className="space-y-3">
                        <input type="password" placeholder="Current Password" className="w-full border px-3 py-2 rounded" />
                        <input type="password" placeholder="New Password" className="w-full border px-3 py-2 rounded" />
                        <input type="password" placeholder="Confirm New Password" className="w-full border px-3 py-2 rounded" />
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                            Update Password
                        </button>
                    </div>
                </Overlay>
            )}

            {/* Delete Account Overlay */}
            {showDeleteOverlay && (
                <Overlay title="Delete Account" onClose={() => setShowDeleteOverlay(false)}>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to permanently delete your account? This action cannot be undone.
                        </p>
                        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                            Confirm Delete
                        </button>
                    </div>
                </Overlay>
            )}
            {/* Feedback Overlay */}
            {showFeedback && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setShowFeedback(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Help & feedback</h3>
                        {!submitted ? (
                            <>
                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your feedback, suggestions, or issues..."
                                    className="w-full border rounded-lg p-3 text-sm focus:outline-blue-500"
                                />
                                <button
                                    // onClick={handleSubmit}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Submit
                                </button>
                            </>
                        ) : (
                            <p className="text-green-600 text-sm">Thank you for your feedback!</p>
                        )}
                    </div>
                </div>
)}
        </div>
    );
};

export default Account;
