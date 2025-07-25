import { useState } from "react";
import { Details, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/apiConfig";
import { emailRegex, passwordRegex } from "../utils/validation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../features/auth/authSlice";

export default function SignUp() {
  const [loading, setloading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const userdata = Object.fromEntries(formdata.entries())
    if (!userdata.name || !userdata.email || !userdata.password) {
      toast('Fill all the details')
      return
    }
    if (!emailRegex.test(userdata.email)) {
      toast('Invalid email format')
      return
    }
    if (!passwordRegex.test(userdata.password)) {
      toast('Weak password')
      return
    }

    try {
      setloading(true)
      const response = await api.post('/auth/sign-up', userdata)

      if (response.status === 201) {
        toast.success("Signed Up successfully")
        dispatch(signUp(response.data.user))
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong !')
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-babyblue dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-bluegray dark:text-gray-100 text-center">Create Account</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-bluegray dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-bluegray dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Your name"
              name="name"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-bluegray dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Your email"
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-bluegray dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-turquoise"
                placeholder="Create a password"
                name='password'
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

          <button type='submit' disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
            {loading ? 'Wait a moment...' : 'Sign Up'}
          </button>

          <p className="text-sm text-center text-bluegray dark:text-gray-300 mt-2">
            Already have an account? <Link to='/sign-in' className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>

  );
}
