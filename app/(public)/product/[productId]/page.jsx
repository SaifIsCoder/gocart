'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "@/app/lib/products-utils";
import { getStoreById } from "@/app/lib/stores-utils";
import Loading from "@/components/Loading";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            // First try to get from Redux store
            let productData = products.find((product) => product.id === productId);
            
            // If not found, fetch from Firestore
            if (!productData) {
                productData = await getProductById(productId);
            }
            
            // If product has storeId but no store object, fetch store data
            if (productData && productData.storeId && !productData.store) {
                try {
                    const storeData = await getStoreById(productData.storeId);
                    if (storeData) {
                        productData.store = storeData;
                    }
                } catch (error) {
                    console.error("Error fetching store:", error);
                }
            }
            
            setProduct(productData);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
        scrollTo(0, 0);
    }, [productId]);

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return (
            <div className="mx-6">
                <div className="max-w-7xl mx-auto text-center py-20">
                    <h1 className="text-2xl font-semibold text-slate-400">Product not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="  text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                </div>

                {/* Product Details */}
                <ProductDetails product={product} />

                {/* Description & Reviews */}
                <ProductDescription product={product} />
            </div>
        </div>
    );
}