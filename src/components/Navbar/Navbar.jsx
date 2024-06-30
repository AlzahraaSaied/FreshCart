import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { WishContext } from '../../context/WishContext';


export default function Navbar() {
  let {userLogin , userRegister , setUserLogin, setUserRegister} = useContext(UserContext);
  
  const {cartCount} = useContext(CartContext);
  const {wishCount}=useContext(WishContext);
  let navigate = useNavigate();
  function logout(){
    localStorage.removeItem('userToken')
    setUserLogin(null);
    setUserRegister(null);
    navigate("/login")
  }
  
    useEffect(()=>{

    } , []);
  

    
  return <>
  <nav className='bg-gray-100  fixed top-0 left-0 right-0 z-50'>
    <div className="container items-center flex justify-between mx-auto py-4">
    <div className='flex flex-col xl:flex-row text-center '>
        <img src={logo} width={120} alt="fresh cart logo " />
        <ul className='flex flex-col xl:flex-row justify-around m-0 pl-10'>
          {(userLogin || userRegister )!==null?
          <>    <li className='text-md mx-4 text-slate-500 font-semibold  '><NavLink to={'/'}> Home </NavLink></li>
          <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/about'}> About </NavLink></li>
          <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/categories'}> Categories </NavLink></li>
          <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/brands'}> Brands </NavLink></li>
          <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/products'}> Products </NavLink></li>
          </>:null}
      
        </ul>
      </div>

      <ul className='flex items-center justify-around m-0 pl-10'>
        {(userLogin || userRegister )===null?<>          <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/login'}> Login </NavLink></li>
        <li className='text-md mx-4 text-slate-500 font-semibold '><NavLink to={'/register'}> Register </NavLink></li>  
        </>:   <div className='flex items-center justify-center'> 
        <li className='relative text-md mx-4 text-slate-500 font-semibold '><Link to={'/wishlist'}>  <i className="fa-regular fa-heart  text-3xl text-green-500"></i><div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{wishCount}</div>
        </Link></li>
        <li className=' relative text-md mx-4 text-slate-500 font-semibold '><Link to={'/cart'}>  <i className="fa-solid fa-cart-shopping text-green-500 text-3xl"></i>  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartCount}</div>
        </Link></li>       
        <li className='  text-md mx-4 text-slate-500 font-semibold '><Link to={'/allorders'}>  <i className="fa-solid fa-clipboard-list text-green-500 text-3xl "></i>
        </Link></li>       
        <li className='text-md mx-4 text-slate-900 font-semibold ' onClick={logout}><span className='cursor-pointer'> Logout </span></li></div> 
      }
         
        </ul>
    </div>


  </nav>
 </>
}
