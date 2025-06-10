import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <div>
            <div className="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End Sidebar */}
                <div className="main-panel">
                    <Header />

                    <Outlet />

                    <Footer />
                </div>
                
            </div>
        </div>
    )
}

export default AdminLayout
