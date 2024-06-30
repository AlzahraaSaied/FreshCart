import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';

export default function Allorders() {


const {headers}=useContext(CartContext)
console.log(headers.token);
const {id}=jwtDecode(headers.token);
console.log(id);


/*const [userOrders, setUserOrders] = useState([]); */
/*function getUserOrders() {
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((errors) => {
      console.error(errors); // Log errors to the console
    });
}

useEffect(() => {
  getUserOrders();
}, []);*/





  return (<>
  <div className='order  border-2 border-gray-200 rounded-md p-4'>
    <h1 className='py-3 text-green-500 font-semibold text-3xl text-center'>Thank You for ordering from our e-commerce shopping :)</h1>
    <div className='flex justify-between items-center'>
    



    </div>
  </div>
  
  </>


  )
}
