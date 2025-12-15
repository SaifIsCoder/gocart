'use client'
import { Search, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import toast from "react-hot-toast";
import { clearUserSession } from "@/app/lib/session";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const [user, setUser] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    useEffect(() => {
        if (!auth) {
            console.warn("Firebase auth is not initialized");
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        if (!auth) {
            toast.error("Firebase auth is not initialized");
            return;
        }

        try {
            await signOut(auth);
            clearUserSession(); // Clear session and cookies
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            toast.error("Failed to logout");
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <User size={18} />
                                    <span className="text-sm">{user.displayName || user.email?.split('@')[0]}</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                                Login
                            </Link>
                        )}

                    </div>

                    {/* Mobile Menu Button & Cart */}
                    <div className="sm:hidden flex items-center gap-3">
                        <Link href="/cart" className="relative">
                            <ShoppingCart size={20} className="text-slate-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[10px] text-white bg-slate-600 size-4 rounded-full flex items-center justify-center">{cartCount}</span>
                            )}
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
                        <div className="flex flex-col gap-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                                <Search size={18} className="text-slate-600" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-slate-600 text-sm" 
                                    type="text" 
                                    placeholder="Search products" 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    required 
                                />
                            </form>

                            {/* Navigation Links */}
                            <div className="flex flex-col gap-3 text-slate-600">
                                <Link 
                                    href="/" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-slate-800 transition"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/shop" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-slate-800 transition"
                                >
                                    Shop
                                </Link>
                                <Link 
                                    href="/" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-slate-800 transition"
                                >
                                    About
                                </Link>
                                <Link 
                                    href="/" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-slate-800 transition"
                                >
                                    Contact
                                </Link>
                            </div>

                            {/* User Section */}
                            {user ? (
                                <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <User size={18} />
                                        <span className="text-sm">{user.displayName || user.email?.split('@')[0]}</span>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full flex items-center justify-center gap-2 text-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    href="/login" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-center text-sm"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar