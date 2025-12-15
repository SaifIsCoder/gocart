# 🔐 Admin Access Control Guide

## How Admin Login Works

The admin login page (`/admin/login`) now has **strict access control**. Only emails that are registered in the `admins` collection in Firestore can log in.

## Security Features

1. **Email Whitelist Check**: Before allowing login, the system checks if the email exists in the `admins` collection
2. **Double Verification**: After login, it verifies the user's UID is also in the `admins` collection
3. **Automatic Logout**: If a non-admin user tries to login, they are automatically logged out

## How to Add Admin Users

### Method 1: Using API Endpoint (Recommended)

Visit this URL in your browser (replace with your domain and credentials):

```
https://your-domain.vercel.app/api/create-admin?email=admin@yourdomain.com&password=YourSecurePassword123&username=admin
```

**What this does:**
- Creates a Firebase Authentication user
- Adds the user to the `admins` collection in Firestore with the email
- The email is now whitelisted for admin login

### Method 2: Using Setup Page

1. Create a regular account at `/signup`
2. Go to `/admin/setup`
3. Click "Add Me to Admins Collection"
4. This adds your email to the `admins` collection

### Method 3: Manual Firestore Entry

1. Go to Firebase Console → Firestore Database
2. Navigate to `admins` collection
3. Add a new document with:
   - **Document ID**: User's UID (from Firebase Authentication)
   - **Fields**:
     - `email`: (admin email address) - **REQUIRED for login**
     - `isAdmin`: `true` (boolean)
     - `username`: (optional)
     - `createdAt`: (timestamp)

## Important Notes

⚠️ **Critical**: For an email to be able to login to admin:
- The email **MUST** exist in the `admins` collection
- The document must have an `email` field matching the login email
- The user must also exist in Firebase Authentication

## Login Flow

1. User enters email and password
2. System checks if email exists in `admins` collection → **If NO, login is denied**
3. If YES, Firebase Authentication is attempted
4. After successful auth, system verifies UID is in `admins` collection
5. If both checks pass, user is logged in as admin

## Troubleshooting

### "This email is not authorized for admin access"

**Solution**: The email is not in the `admins` collection. Add it using one of the methods above.

### "You are not authorized as an admin"

**Solution**: The email exists in `admins` but the UID doesn't match. Make sure:
- The document ID in `admins` collection matches the user's UID
- Or the `email` field in the document matches the login email

## Security Best Practices

1. ✅ Only add trusted emails to the `admins` collection
2. ✅ Use strong passwords for admin accounts
3. ✅ Regularly review the `admins` collection
4. ✅ Remove admin access when no longer needed
5. ✅ Consider adding additional security (2FA, IP whitelist, etc.)

---

**Remember**: Only emails in the `admins` collection can access the admin login page!

