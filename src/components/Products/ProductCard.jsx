import React from 'react'

const ProductCard = ({name, category, price, vendor, brand, rating}) => {
  return (
    <div className='flex bg-white w-[530px] rounded-xl p-5'>
        <div className="image-part w-[50%] h-full rounded-xl">
            <img className='rounded-xl h-full ' src="https://www.nicepng.com/png/detail/304-3048415_business-advice-product-icon-png.png" alt="" />
        </div>
        <div className="text-part pl-6 pr-3 flex flex-col ">
            <h3 className='text-sm font-semibold px-2 py-1 bg-yellow-300 w-fit rounded-md'>{brand}</h3>
            <h1 className='text-3xl font-semibold'>{name}</h1>
            <p className='text-sm text-gray-400 mb-3'>{category}</p>
            <p className='font-bold text-xl mb-2'>₹ {price}</p>
            <div className="flex  flex-col  w-full">
                <div className='text-xs text-gray-700'>{rating} <span>⭐</span></div>
                <div className='text-xs text-gray-500'>By {vendor}</div>
            </div>
        </div>

    </div>
  )
}

export default ProductCard