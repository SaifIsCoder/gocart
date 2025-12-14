'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Loading from "@/components/Loading"
import { getAllProducts, deleteProduct, toggleProductStock } from "@/app/lib/products-utils"
import Image from "next/image"
import { Trash2, Edit, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const productsData = await getAllProducts()
            // Add default rating array if not present
            setProducts(productsData.map(product => ({
                ...product,
                rating: product.rating || []
            })))
        } catch (error) {
            toast.error("Failed to fetch products")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (productId, productName) => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
            return
        }

        try {
            await deleteProduct(productId)
            toast.success("Product deleted successfully")
            fetchProducts()
        } catch (error) {
            toast.error("Failed to delete product")
            console.error(error)
        }
    }

    const handleToggleStock = async (productId, currentStock) => {
        try {
            await toggleProductStock(productId, !currentStock)
            toast.success(`Product ${!currentStock ? 'enabled' : 'disabled'} successfully`)
            fetchProducts()
        } catch (error) {
            toast.error("Failed to update product stock")
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl">Manage <span className="text-slate-800 font-medium">Products</span></h1>
                <Link 
                    href="/admin/products/add"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Add New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-slate-400 mt-10">No products found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition">
                            <div className="relative h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <Image 
                                        src={product.images[0]} 
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="object-contain"
                                    />
                                ) : (
                                    <span className="text-slate-400">No Image</span>
                                )}
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                                    product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>
                            
                            <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                            <p className="text-sm text-slate-500 mb-2 line-clamp-2">{product.description}</p>
                            
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <span className="text-xs text-slate-400 line-through">{currency}{product.mrp}</span>
                                    <span className="ml-2 font-semibold text-slate-800">{currency}{product.price}</span>
                                </div>
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{product.category}</span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggleStock(product.id, product.inStock)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm transition ${
                                        product.inStock 
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                                >
                                    {product.inStock ? <EyeOff size={16} /> : <Eye size={16} />}
                                    {product.inStock ? 'Disable' : 'Enable'}
                                </button>
                                <Link
                                    href={`/admin/products/edit/${product.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded text-sm transition"
                                >
                                    <Edit size={16} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id, product.name)}
                                    className="flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded text-sm transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

