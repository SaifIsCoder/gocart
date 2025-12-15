# 🔧 Manual Admin Setup in Firebase Console

## Step-by-Step Guide

### Method 1: Using Firebase Console (Visual Guide)

#### Step 1: Get User UID

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Authentication** in left sidebar
4. Click **Users** tab
5. Find your user (or create one by clicking **Add user**)
6. **Click on the user** to see details
7. **Copy the UID** (it's displayed at the top, looks like: `abc123xyz456def789`)

#### Step 2: Create/Open Admins Collection

1. In Firebase Console, click **Firestore Database** in left sidebar
2. If you see `admins` collection:
   - Click on it
   - Skip to Step 3
3. If you DON'T see `admins` collection:
   - Click **Start collection** button
   - Collection ID: type `admins`
   - Click **Next**

#### Step 3: Add Admin Document

1. Click **Add document** button
2. **Document ID**: 
   - Choose **"Use a custom ID"** (toggle switch)
   - Paste the **User UID** you copied in Step 1
   - This is CRITICAL - the Document ID must match the User UID exactly
3. Add Fields (click **Add field** for each):

   **Field 1:**
   - Field name: `email`
   - Type: `string`
   - Value: `admin@yourdomain.com` (the user's email)

   **Field 2:**
   - Field name: `isAdmin`
   - Type: `boolean`
   - Value: `true` (toggle to true)

   **Field 3 (Optional):**
   - Field name: `username`
   - Type: `string`
   - Value: `admin`

   **Field 4 (Optional):**
   - Field name: `createdAt`
   - Type: `timestamp`
   - Value: Click to set current time

4. Click **Save**

#### Step 4: Verify

Your document should look like this:
```
Collection: admins
Document ID: [User UID from Authentication]
Fields:
  email: "admin@yourdomain.com" (string)
  isAdmin: true (boolean)
  username: "admin" (string) [optional]
  createdAt: [timestamp] [optional]
```

### Method 2: Create User First, Then Add to Admins

1. **Create User in Authentication:**
   - Go to Authentication → Users
   - Click **Add user**
   - Email: `admin@yourdomain.com`
   - Password: (set strong password)
   - Click **Add user**
   - **Copy the UID**

2. **Add to Admins Collection:**
   - Follow Step 2 and Step 3 above
   - Use the UID as Document ID
   - Add email field matching the user's email

### Method 3: Use Setup Page (Easiest)

1. Create account: `https://your-domain.vercel.app/signup`
2. Login with that account
3. Visit: `https://your-domain.vercel.app/admin/setup`
4. Click **"Add Me to Admins Collection"**
5. Done! ✅

## View Admins in Browser Console

To see all admins in the console, add this to any page temporarily:

```javascript
// In browser console (F12) or add to a component
import { listAllAdmins, checkAdminEmail } from '@/app/lib/admin-utils';

// List all admins
listAllAdmins();

// Check specific email
checkAdminEmail('admin@yourdomain.com');
```

Or use this directly in browser console (if you have Firebase initialized):

```javascript
// Open browser console (F12) and paste:
(async () => {
  const { collection, getDocs } = await import('firebase/firestore');
  const { db } = await import('/app/lib/firebase');
  
  const adminsRef = collection(db, "admins");
  const snapshot = await getDocs(adminsRef);
  
  console.log("=== ADMINS COLLECTION ===");
  snapshot.forEach((doc) => {
    console.log("UID:", doc.id);
    console.log("Data:", doc.data());
    console.log("---");
  });
})();
```

## Quick Checklist

- [ ] User exists in Firebase Authentication
- [ ] User UID is copied
- [ ] `admins` collection exists in Firestore
- [ ] Document created with UID as Document ID
- [ ] `email` field added with user's email
- [ ] `isAdmin` field set to `true`
- [ ] User can login at `/admin/login`

## Common Mistakes

❌ **Wrong Document ID**: Using random ID instead of User UID  
✅ **Correct**: Document ID = User UID from Authentication

❌ **Missing email field**: Only has UID, no email field  
✅ **Correct**: Must have `email` field matching login email

❌ **Email mismatch**: Email in document doesn't match login email  
✅ **Correct**: Email field must match exactly (case-sensitive)

❌ **isAdmin not set**: Missing or set to false  
✅ **Correct**: `isAdmin` must be `true`

## Troubleshooting

### Can't see admins collection?
- Create it manually: Click "Start collection" → Name: `admins`

### Document not showing?
- Refresh Firestore page
- Check if you're in the right project
- Verify collection name is exactly `admins` (lowercase)

### Login still not working?
- Verify Document ID matches User UID exactly
- Check email field matches login email exactly
- Ensure `isAdmin` is `true`
- Check browser console for errors

---

**Important**: The Document ID in `admins` collection MUST be the User UID from Authentication!

