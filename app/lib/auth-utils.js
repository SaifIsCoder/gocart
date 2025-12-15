
'use client';

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Check if user is admin
export async function isAdmin(userId) {
  try {
    if (!db) {
      console.error("Firebase Firestore is not initialized");
      return false;
    }
    const adminDoc = await getDoc(doc(db, "admins", userId));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Store user data in Firestore after signup
export async function createUserProfile(userId, userData) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    await setDoc(doc(db, "users", userId), {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      username: userData.username,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

