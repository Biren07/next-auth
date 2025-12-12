"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout sucessfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-slate-900 via-slate-800 to-black p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-300 mb-6">Your profile information</p>

        <hr className="border-gray-600 mb-6" />

        <h2 className="text-xl text-indigo-300 mb-4">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-indigo-400 font-semibold hover:underline"
            >
              {data}
            </Link>
          )}
        </h2>

        <hr className="border-gray-600 mb-6" />

        <div className="flex flex-col space-y-3">
          <button
            onClick={logout}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg shadow-red-600/30 transition"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
