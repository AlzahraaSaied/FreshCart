import React, { useEffect, useState } from 'react';
import Style from './About.module.css';
import sho from '../../assets/images/onlinesho.jpg'


export default function About() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return (
    <div className="flex items-center bg-white">
      <div className="flex-1">
        <img src={sho} alt="Bliss" className="w-full h-[600px]" />
      </div>
      <div className="flex-1 p-5 bg-green-300">
        <h1 className="text-3xl text-green-700 font-bold mb-4 fa-2x">About Us</h1>
        <h2 className="text-green-700 font-semibold pb-5 fa-1x">This is FreshCart.</h2>
        <p className="text-gray-700 leading-loose font-sans">
        At FreshCart Shop, we're passionate about providing high-quality products and exceptional customer service.
        Our journey began with a simple idea: to create an online destination where customers can find everything they need, from electronics to fashion, all in one place.
        we believe in the power of innovation and creativity.
        <p className='py-2 font-semibold text-green-600 fa-1x'>Our Social Media <li className='text-md text-gray-800 font-semibold py-5  flex  '>
            <i className='fab fa-facebook cursor-pointer mr-5 fa-lg'></i>
            <i className='fab fa-twitter cursor-pointer mr-5 fa-lg'></i>
            <i className='fab fa-instagram  cursor-pointer mr-5 fa-lg'></i>
            <i className='fab fa-tiktok  cursor-pointer mr-5  fa-lg'></i>
            <i className='fab fa-youtube cursor-pointer mr-5 fa-lg'></i>
          </li></p>
        </p>
      </div>
    </div>
    
  );
}
