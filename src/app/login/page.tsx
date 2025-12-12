"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);


  const [showPassword, setShowPassword] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login Successfully", response.data);
      toast.success("Login Successfully",{ duration: 3000 });
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message,{ duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {loading ? "Processing..." : "Welcome Back"}
        </h1>
        <p className="text-center text-slate-300 mb-6">Login to your account</p>

 
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="yourname@example.com"
            className="w-full p-3 rounded-lg bg-white/5 border border-gray-400/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg bg-white/5 border border-gray-400/30 
                       text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 
                       focus:ring-1 focus:ring-blue-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>


        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="show-password"
            className="w-4 h-4 text-blue-600 rounded"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password" className="text-gray-300 text-sm">
            Show Password
          </label>
        </div>

  
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full py-3 rounded-lg font-semibold transition-all 
          ${
            buttonDisabled
              ? "bg-blue-400/40 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
          }`}
        >
          Login
        </button>


        <p className="text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
