import React, { useEffect } from 'react';

const About = () => {
  useEffect(()=>{
  window.scrollTo(0,0)
  },[])
  return (
    <div className="   mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Luxelane</h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className="lg:w-1/2 mb-8">
          <p className="text-lg text-gray-600">
            Luxelane is your ultimate destination for premium audio devices and smart accessories. We curate a collection of the finest headphones, earbuds, speakers, and smartwatches to enhance your lifestyle.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Our mission is to provide our customers with top-notch quality products that deliver an exceptional audio experience and cutting-edge technology. Luxelane brings together style, comfort, and functionality in every product we offer.
          </p>
        </div>

        <div className="lg:w-1/2">
          <img
            src="https://freerangestock.com/sample/148758/woman-in-white-earphones-listening-to-music-on-pink-background.jpg" 
            alt="Luxelane Store"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Products</h2>
        <p className="text-lg text-gray-600">
          Luxelane specializes in a variety of high-quality products, including:
        </p>

        <ul className="list-disc list-inside text-lg text-gray-600 mt-4">
          <li>Headphones for immersive audio experiences</li>
          <li>Earbuds for on-the-go convenience</li>
          <li>Premium speakers for crystal-clear sound</li>
          <li>Smartwatches with cutting-edge technology</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
