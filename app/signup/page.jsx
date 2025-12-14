"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { createUserProfile } from "@/app/lib/auth-utils";
import { useState, useEffect } from "react";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaChecked, setCaptchaChecked] = useState(false);

  // Real-time validation for admin username
  useEffect(() => {
    if (formData.username) {
      const usernameLower = formData.username.toLowerCase().trim();
      if (usernameLower === "admin") {
        setErrors((prev) => ({
          ...prev,
          username: "Username 'admin' is not allowed. Please choose a different username.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    }
  }, [formData.username]);

  // Password match validation
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else if (formData.confirmPassword && formData.password === formData.confirmPassword) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.toLowerCase().trim() === "admin") {
      newErrors.username = "Username 'admin' is not allowed";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!captchaChecked) {
      newErrors.captcha = "Please verify that you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Save user data to Firestore
      await createUserProfile(userCredential.user.uid, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
      });

      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err.message.includes("email-already-in-use")
          ? "An account with this email already exists"
          : err.message.includes("weak-password")
          ? "Password is too weak. Please use a stronger password."
          : err.message.includes("invalid-email")
          ? "Invalid email address"
          : "Sign up failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-8">
      <AuthCard title="Create Account">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="email"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              autoComplete="tel"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              autoComplete="username"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 characters)"
                required
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* CAPTCHA Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="captcha"
              checked={captchaChecked}
              onChange={(e) => {
                setCaptchaChecked(e.target.checked);
                if (errors.captcha) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.captcha;
                    return newErrors;
                  });
                }
              }}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="captcha" className="text-sm text-gray-700">
              I'm not a robot
            </label>
          </div>
          {errors.captcha && <p className="text-xs text-red-500">{errors.captcha}</p>}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
