import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, ShoppingCart, CreditCard, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Helmet } from "react-helmet";
import Navbar from '../../components/user/navbar/navbar';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const total = parseFloat(location.state?.total || 0);
  const discount = parseFloat(location.state?.discount || 0);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [saveAddress, setSaveAddress] = useState(false);

  // Define fetchCartItems function before using it
  const fetchCartItems = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const cartResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/cart/${userId}`);
      const cartData = await cartResponse.json();

      if (!cartData.success) {
        setLoading(false);
        return;
      }

      const groupedItems = cartData.cart.reduce((acc, item) => {
        if (!acc[item.productId]) {
          acc[item.productId] = {
            productId: item.productId,
            productQty: item.productQty
          };
        } else {
          acc[item.productId].productQty += item.productQty;
        }
        return acc;
      }, {});

      const productPromises = Object.values(groupedItems).map(async (item) => {
        const productResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/product/${item.productId}`);
        const productData = await productResponse.json();
        
        if (productData.success) {
          return {
            ...productData.product,
            quantity: item.productQty
          };
        }
        return null;
      });

      const products = await Promise.all(productPromises);
      setCartItems(products.filter(product => product !== null));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('savedShippingAddress');
    const savedSaveAddressPreference = localStorage.getItem('saveAddressPreference');
    
    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setAddress(parsedAddress);
      } catch (error) {
        console.error('Error parsing saved address:', error);
      }
    }

    if (savedSaveAddressPreference) {
      setSaveAddress(JSON.parse(savedSaveAddressPreference));
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = {
      ...address,
      [name]: value
    };
    
    setAddress(updatedAddress);

    if (saveAddress) {
      localStorage.setItem('savedShippingAddress', JSON.stringify(updatedAddress));
    }
  };

  const handleSaveAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSaveAddress(isChecked);

    // Save address preference
    localStorage.setItem('saveAddressPreference', JSON.stringify(isChecked));

    if (isChecked) {
      // Save current address to localStorage
      localStorage.setItem('savedShippingAddress', JSON.stringify(address));
    } else {
      // Remove saved address from localStorage
      localStorage.removeItem('savedShippingAddress');
    }
  };

  const isAddressValid = () => {
    return Object.values(address).every(value => value.trim() !== '');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity);
    }, 0);
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * (discount / 100)).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    const userId = sessionStorage.getItem('userId');

    if (saveAddress) {
      try {
        await fetch('https://ecommercebackend-8gx8.onrender.com/update-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            address: Object.values(address).join(', ')
          })
        });
      } catch (err) {
        console.error('Error saving address:', err);
      }
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-GB');
    const time = now.toLocaleTimeString('en-GB');

    const productsOrdered = cartItems.map(item => ({
      productId: item.productId,
      productQty: item.quantity
    }));

    try {
      const response = await fetch('https://ecommercebackend-8gx8.onrender.com/cart/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          date,
          time,
          address: Object.values(address).join(', '),
          price: total,
          productsOrdered
        })
      });

      const data = await response.json();
      
      if (data.message === 'Order placed successfully') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setShowSuccess(true);
        setTimeout(() => {
          navigate('/cart');
        }, 5000);
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        {showSuccess ? (
          <div className="flex items-center p-4 bg-green-200 rounded-lg">
            <CheckCircle className="text-green-500 mr-2" />
            <p className="text-green-600">Your order has been placed successfully!</p>
          </div>
        ) : null}
        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <label>
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={handleSaveAddressToggle}
              />
              Save address for future orders
            </label>
          </div>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="Street"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="City"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="State"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleAddressChange}
            placeholder="Pincode"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            placeholder="Phone"
            className="mb-2 p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Cart Summary</h2>
          <ul className="mt-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>{item.quantity} x ${item.price.replace(/[^\d.]/g, '')}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Discount:</span>
            <span>${calculateDiscountAmount()}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full p-2 bg-blue-500 text-white rounded"
          disabled={!isAddressValid()}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
