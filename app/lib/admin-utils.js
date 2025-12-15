// Admin utilities for debugging and viewing admins collection

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// List all admins in console (for debugging)
export async function listAllAdmins() {
  try {
    if (!db) {
      console.error("Firebase Firestore is not initialized");
      return [];
    }

    const adminsRef = collection(db, "admins");
    const snapshot = await getDocs(adminsRef);
    
    const admins = [];
    console.log("=== ADMINS COLLECTION ===");
    console.log(`Total admins: ${snapshot.size}`);
    console.log("---");
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const adminData = {
        documentId: doc.id,
        email: data.email || "No email",
        isAdmin: data.isAdmin || false,
        username: data.username || "No username",
        createdAt: data.createdAt || "No timestamp",
      };
      admins.push(adminData);
      
      console.log("Document ID (UID):", doc.id);
      console.log("Email:", data.email);
      console.log("Is Admin:", data.isAdmin);
      console.log("Username:", data.username);
      console.log("Created At:", data.createdAt);
      console.log("---");
    });
    
    console.log("=== END OF ADMINS ===");
    return admins;
  } catch (error) {
    console.error("Error listing admins:", error);
    return [];
  }
}

// Check if email exists in admins
export async function checkAdminEmail(email) {
  try {
    if (!db) {
      console.error("Firebase Firestore is not initialized");
      return false;
    }

    const adminsRef = collection(db, "admins");
    const snapshot = await getDocs(adminsRef);
    
    let found = false;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === email) {
        found = true;
        console.log(`✅ Email "${email}" found in admins collection`);
        console.log("Document ID (UID):", doc.id);
        console.log("Full data:", data);
      }
    });
    
    if (!found) {
      console.log(`❌ Email "${email}" NOT found in admins collection`);
    }
    
    return found;
  } catch (error) {
    console.error("Error checking admin email:", error);
    return false;
  }
}

