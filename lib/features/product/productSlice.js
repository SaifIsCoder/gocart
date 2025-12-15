import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts } from '@/app/lib/products-utils'

// Async thunk to fetch products from Firestore
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const products = await getAllProducts();
            // Add default rating array if not present
            return products.map(product => ({
                ...product,
                rating: product.rating || []
            }));
        } catch (error) {
            console.error("Error fetching products:", error);
            // Return empty array if Firebase is not initialized instead of throwing
            if (error.message && error.message.includes("not initialized")) {
                console.warn("Firebase not initialized, returning empty products array");
                return [];
            }
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer