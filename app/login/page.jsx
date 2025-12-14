"use client";

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const errorMessage = err.message.includes("user-not-found")
        ? "No account found with this email"
        : err.message.includes("wrong-password")
        ? "Incorrect password"
        : err.message.includes("invalid-email")
        ? "Invalid email address"
        : "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AuthCard title="Welcome Back">
        {!showForgotPassword ? (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="w-full text-sm text-indigo-600 hover:text-indigo-700 text-center"
              >
                Forgot password?
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Sign up
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail("");
                  }}
                  className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        )}
      </AuthCard>
    </div>
  );
}
