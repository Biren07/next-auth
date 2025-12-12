"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);

      toast.success(response.data.message, { duration: 3000 });

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed:", error);

      const errorMessage =
        error.response?.data?.error || error.message || "Signup failed";
      toast.error(errorMessage, { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-indigo-900 via-slate-900 to-black p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {loading ? "Processing..." : "Create Account"}
        </h1>
        <p className="text-center text-gray-300 mb-6">Sign up to get started</p>

        <label htmlFor="username" className="block text-gray-300 mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Your username"
          className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-gray-400/30 
          text-white placeholder-gray-400 focus:outline-none focus:ring-1 
          focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor="email" className="block text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="example@email.com"
          className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-gray-400/30 
          text-white placeholder-gray-400 focus:outline-none focus:ring-1 
          focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor="password" className="block text-gray-300 mb-1">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="••••••••"
          className="w-full p-3 rounded-lg bg-white/5 border border-gray-400/30 
          text-white placeholder-gray-400 focus:outline-none focus:ring-1 
          focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="flex items-center gap-2 mt-3 mb-6">
          <input
            type="checkbox"
            id="show-password"
            className="w-4 h-4 text-indigo-500 rounded"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password" className="text-gray-300 text-sm">
            Show Password
          </label>
        </div>

        <button
          onClick={onSignUp}
          disabled={buttonDisabled || loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all
            ${
              buttonDisabled || loading
                ? "bg-indigo-400/40 text-white cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            }`}
        >
          {loading ? "Processing..." : "Signup"}
        </button>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
