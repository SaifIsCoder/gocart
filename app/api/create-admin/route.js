// API route to create admin user and add to admins collection
// Access at: /api/create-admin?email=admin@admin.local&password=yourpassword&username=admin
import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Dynamic import to avoid build-time errors
async function getFirebase() {
  const { auth, db } = await import("@/app/lib/firebase");
  if (!auth || !db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  return { auth, db };
}

export async function GET(request) {
  try {
    const { auth, db } = await getFirebase();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const username = searchParams.get("username") || "admin";

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Email and password are required",
          usage: "Use: /api/create-admin?email=admin@admin.local&password=yourpassword&username=admin"
        },
        { status: 400 }
      );
    }

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Add user to admins collection in Firestore
    await setDoc(doc(db, "admins", userId), {
      isAdmin: true,
      username: username,
      email: email,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      data: {
        userId: userId,
        email: email,
        username: username,
        note: "You can now login at /admin/login using the username (without @admin.local)"
      }
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    
    let errorMessage = error.message;
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already registered. Use a different email or add the existing user to admins collection manually.";
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

