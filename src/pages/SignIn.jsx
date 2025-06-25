import { useState } from "react";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/apiConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../features/auth/authSlice"


export default function SignIn() {

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
      const response = await api.post('/auth/sign-in', userdata)
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
    <div className="min-h-screen bg-babyblue flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-bluegray text-center">Sign In</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-bluegray mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-bluegray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Enter your email"
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-bluegray rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-turquoise"
                placeholder="Enter your password"
                name="password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-bluegray"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-bluegray text-white hover:bg-blue-700 font-semibold py-2 rounded-md transition">
            Sign In
          </button>

          <div className="flex items-center justify-center text-sm text-bluegray">
            or
          </div>

          <button className="w-full border border-bluegray text-bluegray font-medium py-2 rounded-md flex items-center justify-center gap-2 hover:bg-babyblue transition">
            <Google fontSize="small" />
            Sign in with Google
          </button>

          <p className="text-sm text-center text-bluegray mt-2">
            Don’t have an account? <Link to="/sign-up" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
