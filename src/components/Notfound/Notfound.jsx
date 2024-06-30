import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import notfound from '../../assets/images/not.jpeg'

export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className=' flex justify-center items-center'><div className="w-96 h-96"><img className='w-full h-full' src={notfound} alt="notfound page" /></div></div>
  
  </>
}
