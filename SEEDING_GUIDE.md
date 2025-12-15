# 🌱 Data Seeding Guide - Post Deployment

This guide explains how to seed initial data into your GoCart application after deployment.

## 📋 Quick Start

After deploying your application, you need to seed initial data. The easiest way is to use the built-in API endpoint.

### Method 1: Using API Endpoint (Recommended)

1. **Deploy your application** to Vercel (or your hosting platform)

2. **Visit the seed endpoint** in your browser:
   ```
   https://your-domain.vercel.app/api/seed-products
   ```

3. **Check the response** - You should see:
   ```json
   {
     "success": true,
     "message": "Successfully seeded 12 products",
     "products": [...]
   }
   ```

4. **Verify in Firebase Console**:
   - Go to Firebase Console → Firestore Database
   - Check the `products` collection
   - You should see 12 products added

### Method 2: Using Script (Local Development)

If you want to seed data locally or from your machine:

1. **Install dependencies** (if not already):
   ```bash
   npm install
   ```

2. **Update the script** with your Firebase config:
   - Edit `scripts/seed-products.js`
   - Update the `firebaseConfig` object with your Firebase credentials

3. **Run the script**:
   ```bash
   node scripts/seed-products.js
   ```

## 🔒 Security Note

⚠️ **Important**: The seed endpoint is currently public. For production, consider:

1. **Adding authentication** to the seed route
2. **Using environment variables** to protect the endpoint
3. **Removing the endpoint** after initial seeding

## 📦 What Gets Seeded

Currently, the seeding script adds:

- ✅ **12 Sample Products** with:
  - Name, description, images
  - MRP and offer price
  - Categories (Decoration, Speakers, Watch, Headphones, etc.)
  - Stock status
  - Store ID (default_store)

## 🛠️ Customizing Seed Data

### To Add More Products

Edit `app/api/seed-products/route.js` and add more products to the `products` array:

```javascript
const products = [
  {
    name: "Your Product Name",
    description: "Product description",
    mrp: 100,
    price: 79,
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    category: "Electronics",
    storeId: "default_store",
    inStock: true,
  },
  // ... more products
];
```

### To Seed Other Data Types

You can create additional seed endpoints:

1. **Create a new API route**: `app/api/seed-[data-type]/route.js`
2. **Follow the same pattern** as `seed-products`
3. **Add your data** and use Firestore to save it

Example for seeding coupons:
```javascript
// app/api/seed-coupons/route.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const coupons = [
  {
    code: "WELCOME10",
    description: "10% off for new users",
    discount: 10,
    forNewUser: true,
    isPublic: true,
    expiresAt: new Date("2025-12-31"),
  },
  // ... more coupons
];

export async function GET() {
  // ... seeding logic
}
```

## 🔍 Troubleshooting

### Error: "Firebase is not initialized"

**Solution**: 
- Check your environment variables in Vercel
- Ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Redeploy after adding environment variables

### Error: "Permission denied"

**Solution**:
- Check Firestore security rules
- Ensure products collection allows writes
- Update rules in Firebase Console → Firestore → Rules

### Products Not Appearing

**Solution**:
1. Check browser console for errors
2. Verify Firestore rules allow public read
3. Check Firebase Console → Firestore → products collection
4. Ensure the seed endpoint returned success

## 📝 Post-Seeding Checklist

After seeding, verify:

- [ ] Products appear in Firestore
- [ ] Products display on the shop page
- [ ] Product images load correctly
- [ ] Categories are working
- [ ] Search functionality works
- [ ] Admin can see products in dashboard

## 🚀 Next Steps

After seeding products:

1. **Create an admin user** (if not done):
   - Visit: `https://your-domain.vercel.app/api/create-admin?email=admin@example.com&password=yourpassword`

2. **Test the application**:
   - Browse products
   - Create a user account
   - Add products to cart
   - Test checkout flow

3. **Add more data**:
   - Create stores via the store creation page
   - Add products via admin/store dashboard
   - Create coupons manually

## 📞 Need Help?

- Check Firebase Console for data
- Review Firestore security rules
- Check Vercel deployment logs
- Verify environment variables

---

**Happy Seeding! 🌱**

