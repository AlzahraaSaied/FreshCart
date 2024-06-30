import React from 'react';
import amazon from '../../assets/images/Amazon_Pay-Logo.wine.png';
import master from '../../assets/images/masterCard.jpeg';
import paypal from '../../assets/images/paypal.png';
import visa from '../../assets/images/visa-logo-png-transparent.png';
import apple from '../../assets/images/store.png';
import google from '../../assets/images/play.png';

export default function Footer() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Categories */}
        <div className="text-gray-700">
          <h5 className="font-bold py-4">Categories</h5>
          <span className="block py-1">Music</span>
          <span className="block py-1">Men Fashion</span>
          <span className="block py-1">Bakery & Biscuits</span>
          <span className="block py-1">Mobiles</span>
          <span className="block py-1">Electronics</span>
         

        </div>

        {/* Get to Know Us */}
        <div className="text-gray-700">
          <h5 className="font-bold py-4">Get to Know us</h5>
          <span className="block py-1">Company</span>
          <span className="block py-1">About</span>
          <span className="block py-1">Blog</span>
          <span className="block py-1">Help Center</span>
          <span className="block py-1">Our Value</span>
        </div>

        {/* For Consumer */}
        <div className="text-gray-700">
          <h5 className="font-bold py-4">For Consumer</h5>
          <span className="block py-1">Payments</span>
          <span className="block py-1">Shipping</span>
          <span className="block py-1">Product Returns</span>
          <span className="block py-1">FAQ</span>
          <span className="block py-1">Shop Checkout</span>
        </div>

        {/* Become A Shopper */}
        <div className="text-gray-700">
          <h5 className="font-bold py-4">Become A Shopper</h5>
          <span className="block py-1">Shopper Opportunities</span>
          <span className="block py-1">Become a Shopper</span>
          <span className="block py-1">Earings</span>
          <span className="block py-1">Ideas & Guides</span>
          <span className="block py-1">New Retails</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 container mx-auto mt-4"></div>

      {/* Get The FreshCart App */}
      <div className="container mx-auto py-4">
        <p className="py-2 text-gray-800 font-bold">Get The FreshCart App</p>
        <p className="text-gray-500">We will send you the link, open it on your phone to download it....</p>
        <div className="flex justify-between items-center py-3">
          <input className="w-3/4 bg-transparent border-2 rounded-md px-3 py-2 focus:outline-none focus:border-green-600" autoFocus id="email1" type="email" placeholder="Email" required />
          <button className="bg-green-600 text-white rounded-md px-4 py-2 ml-4">Share App Link</button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 container mx-auto mt-4"></div>

      {/* Payment Partners */}
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Payment Partners</span>
          <a href="#!"><img src={amazon} className="w-20 cursor-pointer" alt="" /></a>
          <a href="#!"><img src={master} className="w-20 cursor-pointer" alt="" /></a>
          <a href="#!"><img src={paypal} className="w-20 cursor-pointer" alt="" /></a>
          <a href="#!"><img src={visa} className="w-20 cursor-pointer" alt="" /></a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">Get deliveries with FreshCart</span>
          <a href="#!"><img src={apple} className="w-20 cursor-pointer" alt="" /></a>
          <a href="#!"><img src={google} className="w-20 cursor-pointer" alt="" /></a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 container mx-auto mt-4"></div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center container mx-auto py-4">
        <p className="text-gray-700 font-medium">© 2022 - 2024 FreshCart e-Commerce HTML Template. All rights reserved.</p>
        <div className="flex items-center space-x-2 text-gray-500">
          <span>Follow Us On</span>
          <i className="fab fa-facebook px-2 cursor-pointer hover:text-green-500"></i>
          <i className="fab fa-instagram px-2 cursor-pointer hover:text-green-500"></i>
          <i className="fab fa-twitter px-2 cursor-pointer hover:text-green-500"></i>
        </div>
      </div>
    </div>
  );
}
