'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductLoader from "@/components/ProductLoader";

export default function PublicLayout({ children }) {

    return (
        <>
            <ProductLoader />
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
