// API route to seed products - accessible at /api/seed-products
// Usage: Visit https://your-domain.vercel.app/api/seed-products
import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

// Dynamic import to avoid build-time errors
async function getDb() {
  const { db } = await import("@/app/lib/firebase");
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  return db;
}

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

export async function GET(request) {
  try {
    const db = await getDb();
    
    // Check for force parameter in query string
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";
    
    // Check if products already exist to prevent duplicate seeding
    const productsRef = collection(db, "products");
    const existingProducts = await getDocs(productsRef);
    const existingCount = existingProducts.size;
    
    if (existingCount > 0 && !force) {
      return NextResponse.json({ 
        success: false, 
        message: `Products already exist in database (${existingCount} products found).`,
        hint: "To force re-seeding, add ?force=true to the URL: /api/seed-products?force=true",
        existingCount: existingCount
      }, { status: 400 });
    }
    
    const addedProducts = [];
    
    for (const product of products) {
      const docRef = await addDoc(collection(db, "products"), {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      addedProducts.push({ id: docRef.id, name: product.name });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${addedProducts.length} products`,
      products: addedProducts,
      total: addedProducts.length
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      hint: "Make sure Firebase environment variables are set correctly and Firestore rules allow writes."
    }, { status: 500 });
  }
}

