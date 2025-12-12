'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 text-center">
        <h1 className="text-3xl text-white font-bold mb-4">Verify Email</h1>

        <h2 className="text-gray-300 mb-6">
          {token ? `Token: ${token}` : "No token"}
        </h2>

        {verified && (
          <div className="space-y-4">
            <h2 className="text-green-400 text-xl font-semibold">
              Email Verified 🎉
            </h2>
            <Link
              href="/login"
              className="inline-block bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-4">
            <h2 className="text-red-400 text-xl font-semibold">
              Verification Failed
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
