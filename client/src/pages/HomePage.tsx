import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WorkoutsPage from './WorkoutsPage';

const HomePage: React.FC = () => {
  function gradient(arg0: any, arg1: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div id="carouselControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <div className="bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url("https://dudewipes.com/cdn/shop/articles/gigachad.jpg")', height: '100vh', backgroundSize: 'cover' }}>

              <div className="container">
                <h1 className="text-white">Welcome to FitByte</h1>
                <p className="text-white">“FitByte changed my life”</p>
              </div>
            </div>

          </div>
          <div className="carousel-item">
            <div className="bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url("https://ucsdtritons.com/images/2020/6/19/Spanos17.jpg")', height: '100vh', backgroundSize: 'cover' }}>
              <div className="container box1">
                <h1 className="text-white">Our Mission</h1>
                <p className="text-white">Let us do the thinking while you do the pushing.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url("https://ucsdtritons.com/images/2020/6/19/Spanos11_71.jpg")', height: '100vh', backgroundSize: 'cover' }}>
              <div className="container box1">
                <h1 className="text-white">Join today!</h1>
                <p className="text-white">No hidden or additional fees. Just bring your attitude!</p>
              </div>            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default HomePage;