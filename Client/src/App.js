import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";   
import Navbar from "./components/Navbar/Navbar";  
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConfirmOrder from "./pages/ConfirmOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Loader from "./components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/Image/bg-1.png";
    img.onload = () => { 
      setLoading(false);
    };
 
    img.onerror = () => {
      setLoading(false);
    };

    return () => { 
      setLoading(false)
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  
  return ( 
    !loading?<div className=" h-screen">
      <BrowserRouter>
      <div className="mb-20">
      <Navbar />
      </div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/placeorder" element={<ConfirmOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div> :(
      <div className="  h-screen flex justify-center items-center">
             <Loader/>
      </div>
    )
  );
}

export default App;