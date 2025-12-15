# 🚀 Vercel Setup Guide - Step by Step

## 📋 What to Add in Vercel

You need to add **7 Firebase environment variables** in Vercel. Here's exactly what and where:

## 🔑 Environment Variables to Add

Add these **7 variables** in Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Optional:**
```
NEXT_PUBLIC_CURRENCY_SYMBOL=$
```

## 📍 Where to Find These Values

### Step 1: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the **⚙️ Settings icon** (gear) → **Project settings**
4. Scroll down to **"Your apps"** section
5. If you don't have a web app, click **"Add app"** → **Web** (</> icon)
6. You'll see your Firebase configuration like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 2: Map to Environment Variables

| Firebase Config | Vercel Environment Variable | Example Value |
|----------------|---------------------------|---------------|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDbS79ALmtEgqZmr5Og_JqflVfh67pZJ6s` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `casmart-19bbe.firebaseapp.com` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `casmart-19bbe` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `casmart-19bbe.firebasestorage.app` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1045754269658` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1045754269658:web:8c546f5463c82f19fd7ae3` |
| `measurementId` | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-J8PNPGD57Q` |

## 🎯 Where to Add in Vercel (Step-by-Step)

### Method 1: During Project Import (First Time)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. In the **"Configure Project"** screen:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click **"Environment Variables"** section
6. Add each variable one by one:
   - Click **"Add"** or **"Add Another"**
   - Enter **Key**: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Enter **Value**: (paste your Firebase apiKey)
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Add"**
   - Repeat for all 7 variables
7. Click **"Deploy"**

### Method 2: Add to Existing Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. For each variable:
   - Click **"Add New"**
   - Enter **Key**: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Enter **Value**: (paste your value)
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**
   - Repeat for all 7 variables
6. **Important**: After adding all variables, go to **Deployments** tab
7. Click **"..."** (three dots) on latest deployment → **Redeploy**

## 📝 Complete Example

Here's what your Vercel Environment Variables should look like:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDbS79ALmtEgqZmr5Og_JqflVfh67pZJ6s
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = casmart-19bbe.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = casmart-19bbe
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = casmart-19bbe.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 1045754269658
NEXT_PUBLIC_FIREBASE_APP_ID = 1:1045754269658:web:8c546f5463c82f19fd7ae3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = G-J8PNPGD57Q
NEXT_PUBLIC_CURRENCY_SYMBOL = $ (optional)
```

## ⚠️ Important Notes

1. **Select All Environments**: Make sure to check ✅ Production, ✅ Preview, and ✅ Development for each variable

2. **Redeploy After Adding**: After adding environment variables to an existing project, you MUST redeploy:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

3. **No Spaces**: Don't add spaces around the `=` sign in Vercel (it's not needed)

4. **Case Sensitive**: Variable names are case-sensitive. Use exact names as shown.

5. **NEXT_PUBLIC_ Prefix**: All variables must start with `NEXT_PUBLIC_` to be accessible in the browser

## ✅ Verification Steps

After deployment:

1. **Check Build Logs**: 
   - Go to your deployment → **Build Logs**
   - Should see: "✓ Compiled successfully"

2. **Test Your Site**:
   - Visit your Vercel URL: `https://your-project.vercel.app`
   - Should load without errors

3. **Test Firebase**:
   - Try signing up: `/signup`
   - Try admin login: `/admin/login`
   - Check browser console (F12) for any Firebase errors

4. **Test API Routes**:
   - Visit: `https://your-project.vercel.app/api/seed-products`
   - Should work if Firebase is configured correctly

## 🐛 Troubleshooting

### Build Fails
- ✅ Check all 7 variables are added
- ✅ Check variable names are exact (case-sensitive)
- ✅ Check values don't have extra spaces
- ✅ Check all environments are selected

### Firebase Not Working
- ✅ Verify values match Firebase Console exactly
- ✅ Check Firebase authorized domains include your Vercel URL
- ✅ Check browser console for specific errors
- ✅ Redeploy after adding variables

### Still Having Issues?
1. Check Vercel build logs for specific errors
2. Check browser console (F12) for runtime errors
3. Verify Firebase project settings
4. Make sure Firestore and Storage are enabled

---

**🎉 Once all variables are added and deployed, your app will be fully functional!**

