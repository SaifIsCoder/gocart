// Seed script to add products to Firestore
// Run with: node scripts/seed-products.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbS79ALmtEgqZmr5Og_JqflVfh67pZJ6s",
  authDomain: "casmart-19bbe.firebaseapp.com",
  projectId: "casmart-19bbe",
  storageBucket: "casmart-19bbe.firebasestorage.app",
  messagingSenderId: "1045754269658",
  appId: "1:1045754269658:web:8c546f5463c82f19fd7ae3",
  measurementId: "G-J8PNPGD57Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    name: "Modern table lamp",
    description: "Modern table lamp with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty. Enhance your audio experience with this earbuds. Indulge yourself in a world of pure sound with 50 hours of uninterrupted playtime. Equipped with the cutting-edge Zen Mode Tech ENC and BoomX Tech, prepare to be enthralled by a symphony of crystal-clear melodies.",
    mrp: 40,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    category: "Decoration",
    storeId: "default_store",
    inStock: true,
  },
  {
    name: "Smart speaker gray",
    description: "Smart speaker with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 50,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Speakers",
  },
  {
    name: "Smart watch white",
    description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 60,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Watch",
  },
  {
    name: "Wireless headphones",
    description: "Wireless headphones with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 70,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Headphones",
  },
  {
    name: "Smart watch black",
    description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 49,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Watch",
  },
  {
    name: "Security Camera",
    description: "Security Camera with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 59,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Camera",
  },
  {
    name: "Smart Pen for iPad",
    description: "Smart Pen for iPad with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 89,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Pen",
  },
  {
    name: "Home Theater",
    description: "Home Theater with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 99,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Theater",
  },
  {
    name: "Apple Wireless Earbuds",
    description: "Apple Wireless Earbuds with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 89,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Earbuds",
  },
  {
    name: "Apple Smart Watch",
    description: "Apple Smart Watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 179,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Watch",
  },
  {
    name: "RGB Gaming Mouse",
    description: "RGB Gaming Mouse with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 39,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Mouse",
  },
  {
    name: "Smart Home Cleaner",
    description: "Smart Home Cleaner with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 199,
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    storeId: "default_store",
    inStock: true,
    category: "Cleaner",
  }
];

async function seedProducts() {
  try {
    console.log("Starting to seed products...");
    
    for (const product of products) {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`Added product: ${product.name}`);
    }
    
    console.log("✅ Successfully seeded all products!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();

