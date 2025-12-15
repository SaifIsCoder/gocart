# 🔑 Vercel Environment Variables - Quick Reference

## Copy-Paste Ready List

Add these **7 variables** in Vercel → Settings → Environment Variables:

```
1. NEXT_PUBLIC_FIREBASE_API_KEY
2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
3. NEXT_PUBLIC_FIREBASE_PROJECT_ID
4. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
6. NEXT_PUBLIC_FIREBASE_APP_ID
7. NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Optional:**
```
8. NEXT_PUBLIC_CURRENCY_SYMBOL=$
```

## 📍 Where to Add

1. **Vercel Dashboard** → Your Project
2. **Settings** (top menu)
3. **Environment Variables** (left sidebar)
4. Click **"Add New"** for each variable

## ⚙️ Settings for Each Variable

- **Key**: (variable name from list above)
- **Value**: (from Firebase Console)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

## 🔄 After Adding All Variables

**IMPORTANT**: Go to **Deployments** tab → Click **"..."** → **"Redeploy"**

---

See `VERCEL_SETUP.md` for detailed step-by-step instructions.

