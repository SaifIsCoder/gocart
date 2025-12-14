# 🚀 Vercel Deployment Guide

Complete guide to deploy GoCart to Vercel with Firebase integration.

## 📋 Pre-Deployment Checklist

### 1. Firebase Setup

#### A. Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to **Project Settings** (gear icon) → **General** tab
4. Scroll down to **Your apps** section
5. Click on the web app (or create one if needed)
6. Copy all the configuration values

#### B. Enable Firebase Services
- ✅ **Authentication**: Enable Email/Password provider
- ✅ **Firestore Database**: Create database (start in production mode)
- ✅ **Storage**: Enable Firebase Storage
- ✅ **Hosting**: Not needed (using Vercel)

#### C. Set Up Firestore Security Rules (IMPORTANT!)

Go to Firestore Database → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins collection - only admins can read
    match /admins/{adminId} {
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      allow write: if false; // Only server-side or manual
    }
    
    // Products collection - public read, authenticated write
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Stores collection - public read, authenticated write
    match /stores/{storeId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Orders collection - users can read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### D. Set Up Storage Security Rules

Go to Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Create Admin User

1. Go to Firebase Console → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter:
   - **Email**: `admin@yourdomain.com` (use a real email)
   - **Password**: (set a strong password)
4. **Copy the User UID**

5. Go to **Firestore Database**
6. Create collection: `admins`
7. Add document:
   - **Document ID**: (paste the User UID)
   - **Fields**:
     - `isAdmin`: `true` (boolean)
     - `email`: (admin email)
     - `username`: `admin` (string)
     - `createdAt`: (timestamp)

### 3. Seed Initial Data

1. Visit your deployed site: `https://your-domain.vercel.app/api/seed-products`
2. This will add sample products to Firestore
3. Or use Firebase Console to add products manually

## 🚀 Vercel Deployment Steps

### Step 1: Prepare Your Code

1. **Update Firebase Config** (already done in `app/lib/firebase.js`)
2. **Create `.env.local`** for local development:
   ```bash
   cp .env.example .env.local
   # Fill in your Firebase values
   ```

3. **Test Locally**:
   ```bash
   npm run build
   npm start
   ```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/gocart.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### Step 4: Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_CURRENCY_SYMBOL=$
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- After adding, **redeploy** your project

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

## 🔧 Post-Deployment Setup

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your Vercel domain: `your-project.vercel.app`
3. Add your custom domain if you have one

### 2. Test Admin Login

1. Visit: `https://your-domain.vercel.app/admin/login`
2. Login with admin credentials
3. Verify access to admin dashboard

### 3. Test User Features

1. Visit: `https://your-domain.vercel.app/signup`
2. Create a test user account
3. Test product browsing, cart, etc.

## 🛡️ Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use Vercel environment variables
- ✅ Rotate keys if exposed

### 2. Firebase Security Rules
- ✅ Review and test all Firestore rules
- ✅ Test Storage rules
- ✅ Enable App Check (optional but recommended)

### 3. Admin Access
- ✅ Use strong passwords
- ✅ Limit admin users
- ✅ Monitor admin activity

### 4. API Routes
- ✅ Consider adding authentication to seed route
- ✅ Rate limit API endpoints

## 📝 Custom Domain (Optional)

1. In Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Firebase authorized domains

## 🔄 Continuous Deployment

- Every push to `main` branch = automatic production deployment
- Pull requests = preview deployments
- All environment variables are automatically included

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Firebase config is correct
- Check build logs in Vercel

### Admin Login Not Working
- Verify user exists in Firebase Authentication
- Check user UID is in `admins` collection
- Verify Firestore rules allow admin read

### Products Not Loading
- Check Firestore rules allow public read
- Verify products collection exists
- Check browser console for errors

### Images Not Loading
- Verify Storage rules allow public read
- Check image URLs are correct
- Verify Firebase Storage is enabled

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**🎉 Your GoCart is now live on Vercel!**

