# Firebase Setup Guide

## Creating the Admins Collection

### Step 1: Create Admin User in Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **"Add user"**
5. Enter:
   - **Email**: Use a real email address (e.g., `admin@yourdomain.com` or `admin@gmail.com`)
   - **Password**: (set a secure password)
6. Click **"Add user"**
7. **Copy the User UID** (you'll need this in the next step)

### Step 2: Create Admins Collection in Firestore

1. Go to **Firestore Database** in Firebase Console
2. Click **"Start collection"** (if it's your first collection) or click **"Add collection"**
3. Collection ID: `admins`
4. Click **"Next"**
5. **Document ID**: Paste the **User UID** you copied from Step 1
6. Add fields:
   - Field name: `isAdmin`, Type: `boolean`, Value: `true`
   - Field name: `username`, Type: `string`, Value: `admin` (or your username)
   - Field name: `createdAt`, Type: `timestamp`, Value: (click "Set current time")
7. Click **"Save"**

### Step 3: Test Admin Login

1. Go to `/admin/login` in your app
2. Enter:
   - **Email**: The email address you used when creating the admin user (e.g., `admin@yourdomain.com`)
   - **Password**: (the password you set in Firebase Authentication)
3. Click **"Login"**

## Example Structure

```
Collection: admins
├── Document ID: [User UID from Firebase Auth]
│   ├── isAdmin: true
│   ├── username: "admin"
│   └── createdAt: [timestamp]
```

## Notes

- The Document ID **must be** the User UID from Firebase Authentication
- The collection name **must be** exactly `admins` (lowercase)
- You can add multiple admin users by creating more documents with different User UIDs

