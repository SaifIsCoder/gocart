"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import AuthCard from "@/components/auth/AuthCard";

export default function AdminSetupPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is not initialized");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addToAdmins = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!db) {
      toast.error("Firebase Firestore is not initialized. Please check your configuration.");
      return;
    }

    setAdding(true);
    try {
      await setDoc(doc(db, "admins", user.uid), {
        isAdmin: true,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      toast.success("Successfully added to admins collection!");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (error) {
      console.error("Error adding to admins:", error);
      toast.error("Failed to add to admins collection: " + error.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <AuthCard title="Admin Setup">
          <p className="text-center text-gray-600 mb-4">
            Please login first to set up admin access.
          </p>
          <a
            href="/admin/login"
            className="block w-full text-center rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700"
          >
            Go to Login
          </a>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AuthCard title="Add to Admins Collection">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your User Information:</p>
            <p className="text-xs font-mono text-gray-800 break-all">
              <strong>UID:</strong> {user.uid}
            </p>
            <p className="text-xs text-gray-700 mt-2">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Click the button below to add your account to the admins collection in Firestore.
            This will grant you admin access.
          </p>

          <button
            onClick={addToAdmins}
            disabled={adding}
            className="w-full rounded-lg bg-indigo-600 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {adding ? "Adding to Admins..." : "Add Me to Admins Collection"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            After clicking, you'll be redirected to the admin dashboard.
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

