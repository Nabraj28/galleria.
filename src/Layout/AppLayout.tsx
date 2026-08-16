import React from 'react';
import { Outlet } from 'react-router';
import Header from '@/Components/Header';
import Footer from "@/Components/Footer";

const AppLayout: React.FunctionComponent = () => {
    return (
        <main
            style={{
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default AppLayout