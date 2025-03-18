import React from 'react'
import shoppingGif from '../../assets/shopping.gif';
import { IoRemoveOutline } from 'react-icons/io5';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { PiNotePencilDuotone } from 'react-icons/pi';


const Banner = () => {
  return (
    <div className='flex bg-white rounded-3xl '>
        <div className="banner px-10 pt-5 pb-20">
            <div className="company text-lg flex text-[#dd4b28] mb-3">
            <div className="flex items-center">BEST CHOICE</div>
            <div className="text-4xl flex items-center"><IoRemoveOutline /></div>
            </div>
            <div className="actionCall text-4xl md:text-6xl text-black font-bold mb-5">
            Discover, find, and shop the best fits
            </div>
            <div className="text-[#8E8E8E] font-normal text-xl mb-6">Welcome,  Explore on the world's best & largest shopping site</div>
            <div className="buttons flex space-x-6">
            <button
                // Attach scroll handler
                className='flex space-x-3 px-5 py-3 rounded-full border-black border'
            >
                <div className="icon text-black text-lg"><MdOutlineRocketLaunch /></div>
                <div className="text-black">Explore</div>
            </button>
            <button
                 // Attach navigation handler
                className="flex space-x-3 px-5 py-3 rounded-full border border-black"
            >
                <div className="icon text-black text-lg"><PiNotePencilDuotone /></div>
                <div className="text-black">Create</div>
            </button>
            </div>
        </div>
        <img className='rounded-xl w-[400px]' src={shoppingGif} alt="shopping gif" />
    </div>
  )
}

export default Banner