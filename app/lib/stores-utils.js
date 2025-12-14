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

// Get store by ID
export async function getStoreById(storeId) {
  try {
    const storeRef = doc(db, "stores", storeId);
    const storeSnap = await getDoc(storeRef);
    
    if (storeSnap.exists()) {
      const data = storeSnap.data();
      return {
        id: storeSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching store:", error);
    throw error;
  }
}

// Get store by username
export async function getStoreByUsername(username) {
  try {
    const storesRef = collection(db, "stores");
    const q = query(storesRef, where("username", "==", username));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching store by username:", error);
    throw error;
  }
}

// Get all stores
export async function getAllStores() {
  try {
    const storesRef = collection(db, "stores");
    const q = query(storesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const stores = [];
    snapshot.forEach((doc) => {
      stores.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
      });
    });
    
    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
}

