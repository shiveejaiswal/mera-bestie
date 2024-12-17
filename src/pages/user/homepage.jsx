import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Navbar from "../../components/user/navbar/navbar";
import Footer from "../../components/user/footer/footer";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-cubic",
      once: true,
    });
  }, []);

  const productCategories = [
    {
      img: "https://i.pinimg.com/originals/96/24/6e/96246e3c133e6cb5ae4c7843f9e45b22.jpg",
      title: "Stationery",
      description: "Elevate your workspace with our premium stationery.",
      category: "Stationery",
    },
    {
      img: "https://tse1.mm.bing.net/th?id=OIP.EYAqW5p_HzCoXKq1dXvGyQHaFj&pid=Api&P=0&h=180",
      title: "Gift Boxes",
      description: "Curated gifts that speak volumes of your affection.",
      category: "Gift Boxes",
    },
    {
      img: "https://tse3.mm.bing.net/th?id=OIP.90zsFkK9l2Nttf3fQu12ZwHaE8&pid=Api&P=0&h=180",
      title: "Books",
      description: "Transform spaces with our sophisticated decor books.",
      category: "Books",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Helmet>
        <title>Mera Bestie | Unique Gifting Experience</title>
        <meta
          name="description"
          content="Discover unique gifts and thoughtful collections for every occasion."
        />
      </Helmet>
      <ScrollProgress />
      <Navbar />
      <div className="w-full bg-white overflow-hidden">
        {/* Hero Section with Modern Glassmorphism Design */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              src="https://cdn.wallpapersafari.com/89/8/lybQgH.jpg"
              alt="Elegant Gift Background"
              className="w-full h-full object-cover filter brightness-50"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="relative z-10 container mx-auto max-w-4xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl shadow-2xl text-center">
              <h1 className="mb-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-transparent">
                Crafting Memorable Moments
              </h1>
              <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
                Transforming ordinary moments into extraordinary memories with
                our curated collections
              </p>
              <div className="space-x-4 flex justify-center">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                  >
                    Explore Our Story
                  </motion.button>
                </Link>
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Product Categories Section with Refined Styling */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Collections
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover meticulously crafted categories designed to inspire and
                delight
              </p>
            </motion.div>

            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 0.5s ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container relative"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style flex justify-center mt-4"
              itemClass="carousel-item-padding-40-px"
              renderArrow={(direction, handleClick) => (
                <button
                  onClick={handleClick}
                  className={`${
                    direction === "prev" ? "left-4" : "right-4"
                  } absolute top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-full p-3 shadow-xl transition-all hover:bg-opacity-90 z-10`}
                  style={{
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span className="material-icons text-xl">
                    {direction === "prev"
                      ? "keyboard_arrow_left"
                      : "keyboard_arrow_right"}
                  </span>
                </button>
              )}
            >
              {productCategories.map((category, index) => (
                <Link
                  to={`/shop?category=${encodeURIComponent(category.category)}`}
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="relative w-full h-80 overflow-hidden rounded-md transition-all ease-in-out">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-pink-500">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Vision Section with Modern Overlay Design */}
        <section
          className="relative min-h-[80vh] flex items-center"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
              alt="Vision Background"
              className="w-full h-full object-cover filter brightness-50"
              loading="lazy"
            />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <motion.div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl max-w-2xl mx-auto text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Vision
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                We believe in creating more than just products – we craft
                experiences that connect hearts, celebrate relationships, and
                turn ordinary moments into extraordinary memories. Our mission
                is to be your partner in expressing love, appreciation, and
                thoughtfulness.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-12 py-4 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                >
                  Our Journey
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
