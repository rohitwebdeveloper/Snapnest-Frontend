import { useState } from "react";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-babyblue flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-bluegray text-center">Sign In</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-bluegray mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-bluegray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-bluegray rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-turquoise"
                placeholder="Enter your password"
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

          <button className="w-full bg-blue-600 hover:bg-bluegray text-white hover:bg-blue-700 font-semibold py-2 rounded-md transition">
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
        </div>
      </div>
    </div>
  );
}
