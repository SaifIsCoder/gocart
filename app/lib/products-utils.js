'use client';


import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Get all products
export async function getAllProducts() {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
      });
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Get product by ID
export async function getProductById(productId) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      const data = productSnap.data();
      return {
        id: productSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// Get products by store ID
export async function getProductsByStoreId(storeId) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("storeId", "==", storeId), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
      });
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching store products:", error);
    throw error;
  }
}

// Get products by category
export async function getProductsByCategory(category) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
      });
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

// Upload image to Firebase Storage
export async function uploadProductImage(file, productId, imageIndex) {
  try {
    if (!storage) {
      throw new Error("Firebase Storage is not initialized. Please check your environment variables.");
    }
    const storageRef = ref(storage, `products/${productId}/image_${imageIndex}_${Date.now()}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Add new product
export async function addProduct(productData, imageFiles = []) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    // Upload images if provided
    let imageUrls = productData.images || [];
    
    if (imageFiles.length > 0) {
      // Create a temporary product document to get ID for image paths
      const tempProductRef = doc(collection(db, "products"));
      const productId = tempProductRef.id;
      
      // Upload all images
      const uploadPromises = imageFiles
        .filter(file => file !== null)
        .map((file, index) => uploadProductImage(file, productId, index));
      
      imageUrls = await Promise.all(uploadPromises);
    }

    // Add product to Firestore
    const productRef = await addDoc(collection(db, "products"), {
      name: productData.name,
      description: productData.description,
      mrp: parseFloat(productData.mrp),
      price: parseFloat(productData.price),
      category: productData.category,
      images: imageUrls,
      storeId: productData.storeId,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return productRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Update product
export async function updateProduct(productId, productData, newImageFiles = []) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productRef = doc(db, "products", productId);
    
    let imageUrls = productData.images || [];
    
    // Upload new images if provided
    if (newImageFiles.length > 0) {
      const uploadPromises = newImageFiles
        .filter(file => file !== null)
        .map((file, index) => uploadProductImage(file, productId, index));
      
      const newUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newUrls].filter(Boolean);
    }

    await updateDoc(productRef, {
      name: productData.name,
      description: productData.description,
      mrp: parseFloat(productData.mrp),
      price: parseFloat(productData.price),
      category: productData.category,
      images: imageUrls,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      updatedAt: serverTimestamp(),
    });

    return productId;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete product
export async function deleteProduct(productId) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    await deleteDoc(doc(db, "products", productId));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Toggle product stock
export async function toggleProductStock(productId, inStock) {
  try {
    if (!db) {
      throw new Error("Firebase Firestore is not initialized. Please check your environment variables.");
    }
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      inStock: inStock,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error toggling product stock:", error);
    throw error;
  }
}

