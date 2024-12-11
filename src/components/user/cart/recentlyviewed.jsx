import React from "react";
import { Link } from "react-router-dom";
import img1 from '../../Images/img1.jpg';
import img2 from '../../Images/img2.jpg';
import img3 from '../../Images/img3.jpg';
import img4 from '../../Images/img4.jpg';

const RecentlyViewed = () => {
  const products = [
    { id: 1, name: "Customized Journal", price: 199, image: img1, originalPrice: 400 },
    { id: 2, name: "Floral Greeting Card Set", price: 289, image: img2, originalPrice: 400 },
    { id: 3, name: "Premium Leather Diary", price: 289, image: img3, originalPrice: 400 },
    { id: 4, name: "Eco-Friendly Pen Pack", price: 289, image: img4, originalPrice: 400 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Recently Viewed Products</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              </div>
              <div className="p-3 text-center">
                <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-gray-500 line-through text-xs">
                    ₹{product.originalPrice}
                  </span>
                  <span className="font-bold text-pink-600">
                    ₹{product.price}
                  </span>
                </div>
                <Link to={`/${product.id}`}>
                  <button 
                    className="mt-2 w-full bg-pink-50 text-pink-600 py-2 rounded-md 
                    hover:bg-pink-100 transition-colors"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;