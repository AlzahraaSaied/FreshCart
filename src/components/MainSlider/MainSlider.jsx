import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import clothes from '../../assets/images/clothes.jpg';
import laptop from '../../assets/images/laptop.png';
import lap from '../../assets/images/lap.jpeg';
import Slider from "react-slick";
import mobile from '../../assets/images/mobile.jpg';
import shoes from '../../assets/images/shoes.jpg';

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className="row">
    <div className="w-3/4 ">
   
    <Slider {...settings}>
    <img src={clothes}alt="" className=' relative h-[400px] w-full'/>
    <img src={mobile} alt="" className=' relative h-[400px] w-full' />
    <img src={shoes} alt="" className=' relative h-[400px] w-full' />
    

      </Slider>
    </div>
    <div className="w-1/4">
      <img src={laptop} alt="" className='h-[200px] w-full' />
      <img src={lap} alt="" className='h-[200px] w-full'/>
    </div>
  </div>
  </>
}
