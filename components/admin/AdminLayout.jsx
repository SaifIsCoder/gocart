'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/lib/firebase"
import { isAdmin } from "@/app/lib/auth-utils"
import { useRouter, usePathname } from "next/navigation"

const AdminLayout = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isAdminUser, setIsAdminUser] = useState(false)
    const [loading, setLoading] = useState(true)

    // Skip authentication check for login page
    const isLoginPage = pathname === '/admin/login'

    useEffect(() => {
        // If it's the login page, don't check authentication
        if (isLoginPage) {
            setLoading(false)
            return
        }

        // Check if auth is available
        if (!auth) {
            console.warn("Firebase auth is not initialized");
            setIsAdminUser(false)
            setLoading(false)
            router.push("/admin/login")
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const adminStatus = await isAdmin(user.uid)
                setIsAdminUser(adminStatus)
                if (!adminStatus) {
                    router.push("/admin/login")
                }
            } else {
                setIsAdminUser(false)
                router.push("/admin/login")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router, isLoginPage])

    // If it's the login page, render children without authentication check
    if (isLoginPage) {
        return <>{children}</>
    }

    return loading ? (
        <Loading />
    ) : isAdminUser ? (
        <div className="flex flex-col h-screen">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">You are not authorized to access this page</h1>
            <Link href="/" className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full">
                Go to home <ArrowRightIcon size={18} />
            </Link>
        </div>
    )
}

export default AdminLayout