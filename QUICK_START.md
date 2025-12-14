# ⚡ Quick Start Guide

## For Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local` file**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your Firebase config to `.env.local`**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Setup admin user**
   - Create user in Firebase Authentication
   - Add UID to Firestore `admins` collection
   - Login at `/admin/login`

## For Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Import your GitHub repo
   - Add environment variables (same as `.env.local`)
   - Deploy!

3. **Post-deployment**
   - Add Vercel domain to Firebase authorized domains
   - Test admin login
   - Seed products: `https://your-domain.vercel.app/api/seed-products`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

