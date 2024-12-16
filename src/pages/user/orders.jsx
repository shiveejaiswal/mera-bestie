import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from '../../components/user/navbar/navbar';

const Order= () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://ecommercebackend-8gx8.onrender.com/find-my-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600"></div>
          <p className="ml-4 text-lg text-gray-600">Fetching your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <Helmet>
        <title>My Orders | Mera Bestie</title>
      </Helmet>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg mb-6">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          </div>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-600 text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Order Date</h3>
                    <p className="text-gray-800">{order.date} {order.time}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Order Total</h3>
                    <p className="text-gray-800">₹{order.price}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500">Shipping Address</h3>
                    <p className="text-gray-800">{order.address}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Products Ordered</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.productIds.map((productId, index) => (
                      <div key={index} className="bg-pink-50 p-3 rounded-md">
                        <p className="text-gray-800">
                          Product ID: {productId}
                        </p>
                        {/* Assuming product quantity is not provided in the sample data */}
                        {/* <p className="text-gray-600">
                          Quantity: {product.productQty}
                        </p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
