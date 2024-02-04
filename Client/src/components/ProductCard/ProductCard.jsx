import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatPrice } from "../../helpers/formatPrice";
import SmallLoader from "../Loader/SmallLoader";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const formattedPrice = formatPrice(product.price);

  return (
    <Link 
      to={`/product/${product._id}?category=${product.category}`}
      className={` flex mb-2 flex-col border border-red-900 border-opacity-20 hover:scale-105 focus:scale-105 transition duration-150 ease-linear `}
      key={product._id}
    >
      <div 
          style={{zIndex:0}} className={`bg-red-900 bg-opacity-15 flex justify-center items-center p-2`}>
        <LazyLoadImage
          src={product.image}
          onLoad={() => setLoading(false)}
          className="object-contain "
          alt="Not found"
        />
        {loading && (
          <div className="">
            <SmallLoader />
          </div>
        )}
      </div>
      <div className="px-1">
        <div className="line-clamp-1 text-sm md:text-base">{product.name}</div>
      </div>
      <div className="pt-1 px-1 sm:pt-1  md:pt-3 font-semibold sm:text-xl md:text-2xl">
        {" "}
        <span className="text-sm sm:text-lg md:text-xl  align-top">₹</span>{" "}
        {formattedPrice}
      </div>
    </Link>
  );
};

export default ProductCard;
