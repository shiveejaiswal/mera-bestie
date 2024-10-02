import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './hero.css';

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const images = [
    {
      src: 'images/download.jpeg',
      alt: 'Salil Parekh - CEO',
      captionTitle: 'Salil Parekh',
      captionText: 'Chief Executive Officer, Infosys',
    },
    {
      src: 'images/download2.jpeg',
      alt: 'Infosys Springboard',
      captionTitle: 'Infosys Springboard',
      captionText: 'Empowering the youth through digital literacy',
    },
    {
      src: 'images/download3.jpeg',
      alt: 'Infosys Employees',
      captionTitle: 'Infosys Employees',
      captionText: 'Collaborating for a better future',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleClick = () => {
    navigate('/index'); // Redirect to /index when the button is clicked
  };

  return (
    <main>
      <section className="content-section">
        <div className="text-content">
          <p>
            The future of India will be shaped by today’s younger generation who need quality
            education through digital literacy, making them productive and self-reliant citizens.
            'Digital literacy' is the skills required to achieve digital competence and use of
            Information and Communication Technology (ICT) for work, leisure, learning, and
            communication. It does not replace traditional forms of literacy, instead complements
            and amplifies the skills that form the foundation of traditional forms.
          </p>
        </div>
        <div className="image-slider">
          <div className="slider">
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
            <div className="caption">
              <h3>{images[currentIndex].captionTitle}</h3>
              <p>{images[currentIndex].captionText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <button onClick={handleClick}>Get Started</button>
      </section>
    </main>
  );
};

export default Hero;
