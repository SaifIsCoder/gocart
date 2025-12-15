# 📝 Manual Admin Setup Guide

## How to Add Admin Manually in Firebase Console

### Step 1: Get User UID from Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Users** tab
4. Find the user you want to make admin (or create a new user)
5. **Copy the User UID** (it's a long string like: `abc123xyz456...`)

### Step 2: Add to Admins Collection

1. In Firebase Console, go to **Firestore Database**
2. Click on **Collections** (if you don't see `admins` collection, create it)
3. Click **Start collection** (if collection doesn't exist) or click on `admins` collection
4. Click **Add document**
5. Set up the document:
   - **Document ID**: Paste the **User UID** you copied (IMPORTANT: Use the UID as document ID)
   - **Fields**: Add these fields:
     ```
     Field name: email
     Type: string
     Value: admin@yourdomain.com
     
     Field name: isAdmin
     Type: boolean
     Value: true
     
     Field name: username (optional)
     Type: string
     Value: admin
     
     Field name: createdAt
     Type: timestamp
     Value: (click to set current time)
     ```
6. Click **Save**

### Step 3: Verify

The document structure should look like this:
```
Collection: admins
Document ID: [User UID]
Fields:
  - email: "admin@yourdomain.com" (string)
  - isAdmin: true (boolean)
  - username: "admin" (string) [optional]
  - createdAt: [timestamp]
```

## Alternative: Create User First, Then Add to Admins

### Method 1: Create User in Firebase Console

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - **Email**: `admin@yourdomain.com`
   - **Password**: (set a strong password)
4. Click **Add user**
5. **Copy the User UID** that appears
6. Follow **Step 2** above to add to `admins` collection

### Method 2: Use the Setup Page

1. Create a regular account at: `https://your-domain.vercel.app/signup`
2. Log in with that account
3. Go to: `https://your-domain.vercel.app/admin/setup`
4. Click **"Add Me to Admins Collection"**
5. This will automatically add your email and UID to the `admins` collection

## Console Logging for Debugging

If you want to see the admins collection in the browser console, you can add this code temporarily:

```javascript
// In your browser console (F12)
// This will show all admins (requires proper Firebase setup)

import { collection, getDocs } from "firebase/firestore";
import { db } from "./app/lib/firebase";

async function listAdmins() {
  const adminsRef = collection(db, "admins");
  const snapshot = await getDocs(adminsRef);
  
  console.log("=== ADMINS COLLECTION ===");
  snapshot.forEach((doc) => {
    console.log("Document ID:", doc.id);
    console.log("Data:", doc.data());
    console.log("---");
  });
}

listAdmins();
```

## Quick Checklist

✅ User exists in Firebase Authentication  
✅ User UID is copied  
✅ Document created in `admins` collection  
✅ Document ID = User UID  
✅ `email` field matches the user's email  
✅ `isAdmin` field = `true`  
✅ User can now login at `/admin/login`

## Troubleshooting

### "This email is not authorized for admin access"
- Check if the email exists in `admins` collection
- Verify the `email` field matches exactly (case-sensitive)
- Make sure the document has an `email` field

### "You are not authorized as an admin"
- Check if the Document ID matches the User UID
- Verify the document exists in `admins` collection
- Make sure `isAdmin` field is set to `true`

### Can't find the collection
- Create it manually: Click "Start collection" → Name it `admins`
- Or use the API endpoint: `/api/create-admin` (creates it automatically)

---

**Remember**: The Document ID in `admins` collection MUST match the User UID from Authentication!

