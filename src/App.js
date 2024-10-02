import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import './App.css';
import IndexPage from './pages/index/indexPage'; // Import IndexPage or the component for the '/index' route
import HomePage from './pages/home/homepage';

function App() {
  return (
    <Router> 
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/index" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}
export default App;
