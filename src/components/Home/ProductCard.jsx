import React from 'react';
import { IoMdCart } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { cartActions } from '../../reduxContainer/cartSlice';

const ProductCard = ({id, name, category, price, brand, rating}) => {
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(cartActions.addToCart({
      id,
      name,
      price: parseFloat(price),
      brand,
      category
    }));
    alert("Added to cart");
  };

  return (
    <div className='flex flex-col space-y-5 border w-[300px] rounded-2xl p-5'>
        <div className="image-part h-full rounded-xl">
            <img className='rounded-xl h-full' src="https://e7.pngegg.com/pngimages/789/115/png-clipart-computer-icons-box-icon-design-product-box-miscellaneous-angle.png" alt="" />
        </div>
        <div className="text-part flex flex-col">
            <h3 className='text-sm font-semibold px-2 py-1 bg-[#df4927] text-white w-fit rounded-md'>{brand}</h3>
            <h1 className='text-3xl text-[#2b3446] font-semibold'>{name}</h1>
            <p className='text-sm text-gray-400 mb-3'>{category}</p>
            <p className='font-bold text-xl text-[#2b3446] mb-2'>₹ {price}</p>
            <div className="flex justify-between w-full">
                <div className='text-xs text-gray-700'>{rating} <span>⭐</span></div>
                <button onClick={handleCartClick} className='p-2 cursor-pointer rounded-full bg-[#2b3446] text-white text-[20px]'><IoMdCart /></button>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;