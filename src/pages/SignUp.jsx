import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-babyblue flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-bluegray text-center">Create Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-bluegray mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-bluegray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-bluegray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block text-sm text-bluegray mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-bluegray rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-turquoise"
                placeholder="Create a password"
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

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
            Sign Up
          </button>

          <p className="text-sm text-center text-bluegray mt-2">
            Already have an account? <Link to='/sign-in' className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
