import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const HomeCarousel = () => {
  return (
    <section className="relative">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false} 
        showArrows={false} 
        interval={2000} 
        className="h-[60vh] text-white"
      >
        {/* Slide 1 */}
        <div className="relative h-[60vh]">
          <img src="https://unsplash.com/photos/Q59HmzK38eQ/download?force=true&w=1920" alt="Slide 1" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Deals!</h1>
              <p className="text-lg md:text-2xl mb-6">Explore our top products and latest collections at unbeatable prices.</p>
              <Link to="/shop" className="bg-gold text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-charcoal-gray transition duration-300">Shop Now</Link>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[60vh]">
          <img src="https://unsplash.com/photos/_3Q3tsJ01nc/download?force=true&w=1920" alt="Slide 2" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Fashion Fiesta!</h1>
              <p className="text-lg md:text-2xl mb-6">Up to 50% off on all fashion items. Limited time only!</p>
              <Link to="/category/Fashion" className="bg-gold text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-charcoal-gray transition duration-300">Shop Now</Link>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[60vh]">
          <img src="https://unsplash.com/photos/_-JR5TxKNSo/download?force=true&w=1920" alt="Slide 3" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Electronics Extravaganza!</h1>
              <p className="text-lg md:text-2xl mb-6">Get the latest gadgets at the best prices.</p>
              <Link to="/category/Electronics" className="bg-gold text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-charcoal-gray transition duration-300">Shop Now</Link>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HomeCarousel;
