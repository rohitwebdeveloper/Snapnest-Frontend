// pages/AccountSettingsPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import { logout, setUser } from '../features/auth/authSlice';
import { passwordRegex } from '../utils/validation';

import ProfileSection from '../components/account/ProfileSection';
import SettingsActions from '../components/account/SettingsActions';
import UploadImageOverlay from '../components/account/UploadImageOverlay';
import ChangePasswordOverlay from '../components/account/ChangePasswordOverlay';
import DeleteAccountOverlay from '../components/account/DeleteAccountOverlay';

const Account = () => {
    const [showUploadOverlay, setShowUploadOverlay] = useState(false);
    const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState(null);

    const { name, email, avatar } = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onLogout = async () => {
        try {
            const response = await api.post('/auth/logout');
            if (response.status === 200) {
                dispatch(logout());
                toast.success('Logged out successfully');
                navigate('/sign-in');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal server error');
        }
    };


    const onUpdatePassword = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        formdata.append('email', email);
        const passwordData = Object.fromEntries(formdata.entries());

        if (!passwordData.newpassword || !passwordData.confirmpassword) {
            toast('Please fill all the details');
            return;
        }
        if (!passwordRegex.test(passwordData.newpassword) || !passwordRegex.test(passwordData.confirmpassword)) {
            toast('Enter strong password');
            return;
        }
        if (passwordData.newpassword !== passwordData.confirmpassword) {
            toast('Both passwords do not match');
            return;
        }
        try {
            const response = await api.post('/auth/reset-password', passwordData);
            if (response.status === 200) {
                toast.success('Password updated successfully');
                setShowPasswordOverlay(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal server error');
        }
    };


    const onDeleteAccount = async () => {
        try {
            const response = await api.post('/auth/delete-account');
            if (response.status === 200) {
                toast.success('Account deleted successfully');
                navigate('/sign-in');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal server error');
        }
    };


    const onSave = async () => {
        if (!file) {
            toast('Please upload profile image');
            return;
        }
        const formdata = new FormData();
        formdata.append('photo', file);
        try {
            const response = await api.post('/user/upload-profile-image', formdata, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (response.status === 200) {
                toast.success('Profile photo changed');
                dispatch(setUser(response.data.user));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal server error');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-blue-100 px-6 py-10 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-medium text-gray-900 border-b-2 border-blue-200 pb-4 mb-6">Account Settings</h1>
                <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
                    <ProfileSection avatar={avatar} name={name} email={email} onEditClick={() => setShowUploadOverlay(true)} />
                    <SettingsActions
                        onChangePassword={() => setShowPasswordOverlay(true)}
                        onLogout={onLogout}
                        onDeleteAccount={() => setShowDeleteOverlay(true)}
                        onFeedback={() => setShowFeedback(true)}
                    />
                </div>
            </div>
            <UploadImageOverlay
                open={showUploadOverlay}
                onClose={() => setShowUploadOverlay(false)}
                onFileChange={(e) => setFile(e.target.files[0])}
                onSave={onSave}
            />
            <ChangePasswordOverlay
                open={showPasswordOverlay}
                onClose={() => setShowPasswordOverlay(false)}
                onSubmit={onUpdatePassword}
            />
            <DeleteAccountOverlay
                open={showDeleteOverlay}
                onClose={() => setShowDeleteOverlay(false)}
                onConfirmDelete={onDeleteAccount}
            />
        </div>
    );
};

export default Account;
