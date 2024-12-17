import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaSearch, FaTimes, FaBars, FaUser, FaHeart, FaShoppingCart, 
  FaGift, FaHome, FaStore, FaEnvelope 
} from "react-icons/fa";
import SearchBar from "./SearchBar";

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSellerLoginOpen, setIsSellerLoginOpen] = useState(false); // Modal state for seller login
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate(); // To handle redirection
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleSellerLogin = () => setIsSellerLoginOpen(!isSellerLoginOpen); // Toggle modal
  const isActive = (path) => location.pathname === path;
  const searchRef = useRef();

  useEffect(() => {
    const fetchCartItems = async () => {
      var total = 0;
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;
      const cartResponse = await fetch(
        `https://ecommercebackend-8gx8.onrender.com/cart/${userId}`
      );
      const cartData = await cartResponse.json();
      cartData.cart?.forEach((item) => {
        total = total + item.productQty;
      });
      setCartItemCount(total);
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `https://ecommercebackend-8gx8.onrender.com/auth/user/${userId}`
          );
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    fetchUserName();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const handleSellerLogin = (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check if both email and password fields are filled
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    // If both fields are filled, redirect to /admin page
    sessionStorage.setItem("userId", email);  // Store email temporarily as userId
    navigate("/admin"); // Redirect to /admin after successful login
  };

  const userId = sessionStorage.getItem("userId");

  return (
    <nav
      className={`top-0 left-0 w-full z-50 transition-all duration-300 mb-auto ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Top Promotional Banner */}
      <div
        className={`bg-pink-600 text-white py-2 text-center text-xs transition-all duration-300 ${
          scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-center">
          <FaGift className="mr-2" />
          <span>
            USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 | FREE
            SHIPPING | COD AVAILABLE
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-[70px] flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-black hover:text-pink-600 transition"
            >
              <FaBars className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link
              to="/HomePage"
              className="text-2xl flex items-center hover:opacity-80 transition"
            >
              <span className="font-['Bodoni_MT'] font-bold text-2xl text-pink-600">
                MERA Bestie
              </span>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex space-x-8 text-sm font-medium">
              {[{ path: "/HomePage", name: "HOME" }, { path: "/shop", name: "SHOP" }, { path: "/contact", name: "CONTACT" }, { path: "/about", name: "ABOUT" }]
                .map(({ path, name }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`relative group transition-colors ${
                      isActive(path) ? "text-pink-600" : "text-gray-800"
                    } hover:text-pink-600`}
                  >
                    {name}
                    <span
                      className={`absolute bottom-[-4px] left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full ${
                        isActive(path) ? "w-full" : ""
                      }`}
                    />
                  </Link>
                ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-6">
              <button
                className="text-gray-800 hover:text-pink-600 transition"
              >
                {isSearchOpen ? (
                  <div ref={searchRef}>
                    <SearchBar />
                  </div>
                ) : (
                  <FaSearch className="w-5 h-5" onClick={toggleSearch} />
                )}
              </button>

              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-pink-600 transition flex items-center"
              >
                <FaShoppingCart className="w-5 h-5" />
                <span className="ml-2 hidden md:block">Cart</span>
                {cartItemCount ? (
                  <span className="absolute top-[-8px] right-[-8px] bg-pink-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                ) : null}
              </Link>

            

              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-800 hover:text-pink-600 transition"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="ml-2 hidden md:block">
                    {userId ? `Hi, ${userName}` : "Profile"}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                    {userId ? (
                      <>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Sign Up
                        </Link>
                        <Link
                          to="/seller/login"
                          className="block w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                          onClick={toggleSellerLogin}
                        >
                          Seller
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Login Modal */}
      {isSellerLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleSellerLogin}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Seller Login</h2>
            <form onSubmit={handleSellerLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProfessionalNavbar;
