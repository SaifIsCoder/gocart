"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { isAdmin } from "@/app/lib/auth-utils";
import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validateEmail } from "@/app/lib/validation";
import { setUserSession } from "@/app/lib/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError("");

    // Validate email
    const emailValidation = validateEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      toast.error(emailValidation);
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      toast.error("Password is required");
      setLoading(false);
      return;
    }

    if (!auth) {
      setError("Firebase authentication is not initialized. Please check your configuration.");
      toast.error("Authentication service unavailable");
      setLoading(false);
      return;
    }

    try {
      // Login with actual email address
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify admin status
      const adminStatus = await isAdmin(userCredential.user.uid);
      if (!adminStatus && auth) {
        await auth.signOut();
        setError("You are not authorized as an admin. This account does not have admin privileges.");
        toast.error("Access denied. Admin privileges required.");
        return;
      }
      
      // Set user session
      setUserSession({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        isAdmin: true,
      });
      
      toast.success("Admin login successful!");
      router.push("/admin");
    } catch (err) {
      let errorMessage = err.message;
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please enter a valid email.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AuthCard title="Admin Login">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Admin Email"
              required
              autoComplete="email"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                if (value && !value.includes("@")) {
                  setEmailError("Email must contain @ symbol");
                } else if (value) {
                  const emailValidation = validateEmail(value);
                  setEmailError(emailValidation || "");
                } else {
                  setEmailError("");
                }
              }}
            />
            {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
            <p className="text-xs text-gray-500 mt-1">Enter your admin email address</p>
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
      </AuthCard>
    </div>
  );
}

