import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Dashboard from '../../components/admin/dashboard';
import Sidebar from '../../components/admin/sidebar';

const DashboardPage = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            if (width >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const verifySeller = async () => {
            if (!sellerId) {
                navigate('/seller/login');
                return;
            }

            try {
                const response = await fetch('https://ecommercebackend-8gx8.onrender.com/admin/verify-seller', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sellerId })
                });

                const data = await response.json();
                
                if (data.loggedIn !== 'loggedin') {
                    navigate('/seller/login');
                }
            } catch (error) {
                console.error('Error verifying seller:', error);
                navigate('/seller/login');
            }
        };

        verifySeller();
    }, [sellerId, navigate]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Mera Bestie</title>
                <meta name="description" content="Admin dashboard for managing products, orders and customers" />
            </Helmet>
            <div className="flex h-screen bg-gray-50">
                {/* Mobile menu button */}
                <button
                    className="fixed top-4 left-4 z-50 lg:hidden bg-pink-500 text-white p-2 rounded-md"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static`}
                >
                    <Sidebar isMobile={isMobile} />
                </div>

                {/* Main content */}
                <div className={`flex-1 transition-all duration-300 ${
                    isOpen ? 'ml-0 lg:ml-64' : 'ml-0'
                }`}>
                    <div className="p-4 pt-20 lg:pt-4">
                        <div className="hidden md:block text-2xl font-bold text-pink-500">
                            Mera Bestie
                        </div>
                        <Dashboard />
                    </div>
                </div>

                {/* Overlay for mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </div>
        </>
    );
};

export default DashboardPage;