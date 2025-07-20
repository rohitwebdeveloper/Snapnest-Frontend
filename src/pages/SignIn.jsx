import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/apiConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../features/auth/authSlice"
import { GoogleLogin } from "@react-oauth/google";


export default function SignIn() {

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const userdata = Object.fromEntries(formdata.entries())

    if (!userdata.email || !userdata.password) {
      toast("Fill all the details")
      return
    }

    try {
      setLoading(true)
      const response = await api.post('/auth/sign-in', userdata)
      if (response.status === 200) {
        toast.success("Logged In successfully")
        dispatch(signIn(response.data.userdata))
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong !')
    } finally {
      setLoading(false)
    }
  }


  const GoogleLoginSuccess = async (credRes) => {
    try {
      const response = await api.post('/auth/google/sign-in', { credRes })
      if (response.status === 200) {
        toast.success("Logged In successfully")
        dispatch(signIn(response.data.userdata))
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong !')
    }
  }


  return (
    <div className="min-h-screen bg-babyblue dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-bluegray dark:text-gray-100 text-center">Sign In</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-bluegray dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-bluegray dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Enter your email"
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-bluegray dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-turquoise"
                placeholder="Enter your password"
                name="password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-bluegray dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link to='/forgot-password' className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? 'Wait a moment...' : 'Sign In'}
          </button>

          <div className="flex items-center justify-center text-sm text-bluegray dark:text-gray-300">
            or
          </div>

          <div className="w-full flex justify-center max-w-[384px]">
            <GoogleLogin
              onSuccess={GoogleLoginSuccess}
              onError={() => toast.error('Failed to login with Google')}
              size="medium"
              shape="pill"
              logo_alignment="center"
              width="230px" 
            />
          </div>

          <p className="text-sm text-center text-bluegray dark:text-gray-300 mt-2">
            Don’t have an account?{' '}
            <Link to="/sign-up" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>

  );
}
