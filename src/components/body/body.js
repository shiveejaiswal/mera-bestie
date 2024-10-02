import React from 'react';
import './body.css';

const Body = () => {
  const sections = [
    {
      title: "CATCH THEM YOUNG",
      image: "images/image1.jpg", // Replace with the correct image path
    },
    {
      title: "DAILY CODING CLASSES",
      image: "images/image2.webp", // Replace with the correct image path
    },
    {
      title: "SPOKEN ENGLISH",
      image: "images/image3.jpg", // Replace with the correct image path
    },
    {
      title: "TECHNOLOGY TRAINING",
      image: "images/image4.webp", // Replace with the correct image path
    },
  ];

  return (
    <div className="body-wrapper">
      <div className="main-body">
        <h2>About Infosys Springboard</h2>
        <p>Infosys Springboard is a Digital literacy program launched...</p>
        <div className="card-container">
          {sections.map((section, index) => (
            <div key={index} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={section.image} alt={section.title} />
                  <h3>{section.title}</h3>
                </div>
                <div className="card-back">
                  <h3>{section.title}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
