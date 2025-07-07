import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import { passwordRegex } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('')
  const [time, settime] = useState(120)
  const intervalRef = useRef()
  const navigate = useNavigate()



  const handleSendOtp = async () => {
    if (!email.trim()) return toast.error('Enter your email');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.status === 200) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setStep(2);
        settime(120)
        toast.success('OTP sent to your email');

        intervalRef.current = setInterval(() => {
          settime((preval) => {
            if (preval <= 1) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            return preval - 1
          })
        }, 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error sending OTP');
      setStep(1)
    }
  };


  const handleVerifyOtp = async () => {
    if (!otp.trim()) return toast.error('Enter OTP');
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      if (res.status === 200) {
        toast.success('OTP verified');
        setStep(3);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid OTP');
    }
  };


  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmpassword.trim()) return toast.error('Enter both fields');
    if (!passwordRegex.test(confirmpassword)) return toast.error('Enter strong password')
    try {
      const res = await api.post('/auth/reset-password', { email, confirmpassword });
      if (res.status === 200) {
        toast.success('Password updated successfully');
        navigate('/sign-in')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Forgot Password</h2>

        {step === 1 && (
          <div>
            <label className="block text-gray-700 mb-2">Enter your account email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Send OTP
            </button>
          </div>
        )}


        {step === 2 && (
          <div>
            <label className="block text-gray-700 mb-2">Enter OTP sent to your email</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-blue-500"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className='mb-3 flex justify-between'>
              {time !== 0 && <p className='font-medium text-blue-500'>OTP is valid till:  {Math.floor(time / 60)} : {time % 60} (sec)</p>}
              {time === 0 && <button className='bg-black outline-none py-1 px-2 rounded-md text-white font font-semibold' onClick={handleSendOtp} >Resend OTP</button>}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-gray-700 mb-2">Enter new password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-blue-500"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-blue-500"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
