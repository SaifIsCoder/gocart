# ✅ Vercel Deployment Checklist

Use this checklist to ensure everything is set up correctly before and after deployment.

## 🔧 Pre-Deployment

### Firebase Setup
- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] Storage enabled
- [ ] Firebase config values copied
- [ ] Firestore security rules configured
- [ ] Storage security rules configured

### Admin Setup
- [ ] Admin user created in Firebase Authentication
- [ ] Admin user UID copied
- [ ] `admins` collection created in Firestore
- [ ] Admin document added with UID as document ID
- [ ] Admin document has `isAdmin: true` field

### Code Preparation
- [ ] `.env.local` file created with Firebase config
- [ ] `.env.local` added to `.gitignore`
- [ ] Firebase config uses environment variables (not hardcoded)
- [ ] All temporary debug code removed
- [ ] Code tested locally (`npm run build` succeeds)
- [ ] No console errors in browser

### Git Setup
- [ ] Code committed to Git
- [ ] Repository pushed to GitHub
- [ ] `.env` files not committed

## 🚀 Vercel Deployment

### Project Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Framework preset: Next.js (auto-detected)

### Environment Variables
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY` added
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` added
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID` added
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` added
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` added
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID` added
- [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` added
- [ ] `NEXT_PUBLIC_CURRENCY_SYMBOL` added (optional)
- [ ] All variables added for Production, Preview, and Development

### Deployment
- [ ] Initial deployment triggered
- [ ] Build completed successfully
- [ ] No build errors
- [ ] Deployment URL received

## 🔐 Post-Deployment Security

### Firebase Configuration
- [ ] Vercel domain added to Firebase authorized domains
  - Go to: Authentication → Settings → Authorized domains
  - Add: `your-project.vercel.app`
- [ ] Custom domain added (if applicable)
- [ ] Firestore rules tested
- [ ] Storage rules tested

### Testing
- [ ] Homepage loads correctly
- [ ] User signup works
- [ ] User login works
- [ ] Admin login works (`/admin/login`)
- [ ] Admin dashboard accessible
- [ ] Products load from Firestore
- [ ] Product images load
- [ ] Cart functionality works
- [ ] Search works

### Data Setup
- [ ] Products seeded (visit `/api/seed-products`)
- [ ] Sample products visible on site
- [ ] Admin can add products
- [ ] Store functionality tested

## 🎯 Production Readiness

### Performance
- [ ] Images optimized
- [ ] Build size reasonable
- [ ] Page load times acceptable
- [ ] No console errors

### Security
- [ ] No hardcoded secrets
- [ ] Environment variables secure
- [ ] Firebase rules properly configured
- [ ] Admin access restricted
- [ ] HTTPS enabled (automatic on Vercel)

### Monitoring
- [ ] Error tracking set up (optional)
- [ ] Analytics configured (optional)
- [ ] Logs accessible in Vercel dashboard

## 📝 Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Team members have access
- [ ] Admin credentials documented (securely)

## 🆘 Troubleshooting

If something doesn't work:

1. **Check Vercel Build Logs**
   - Go to Vercel dashboard → Deployments → Click on deployment
   - Check for build errors

2. **Check Environment Variables**
   - Verify all variables are set
   - Check for typos
   - Ensure no extra spaces

3. **Check Firebase Console**
   - Verify services are enabled
   - Check authorized domains
   - Review security rules

4. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors
   - Check network requests

5. **Redeploy**
   - Sometimes a redeploy fixes issues
   - Go to Vercel → Deployments → Redeploy

---

**✅ All checked? Your app is ready for production!**

