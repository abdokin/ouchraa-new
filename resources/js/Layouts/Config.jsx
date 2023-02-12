import { Head, usePage } from "@inertiajs/inertia-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Components/Dashboard/Navbar";
import Footer from "../Components/Dashboard/Footer";
import SidebarConfig from "../Components/Dashboard/SidebarConfig";

export default function ConfigLayout({ children, title }) {
    const { flash, auth } = usePage().props;

    flash.type && toast[flash.type](flash.message);

    return (
        <div className="g-sidenav-show bg-gray-100">
            <div className="min-height-300 bg-primary position-absolute w-100"></div>
            <Head title={title} />
            <Navbar pageName={title} />

            <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
                {/* <Navbar pageName={ title } /> */}
                <SidebarConfig isEmployee={auth.isEmployee} />
                <Toaster position="top-center" duration="4000" />
                {children}
                <Footer />
            </main>
        </div>
    );
}
