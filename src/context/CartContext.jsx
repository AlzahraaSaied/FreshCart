import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);


export default function CartContextProvider(props){
        let [cartCount, setCartCount] = useState(0);
        let [cartId,setCartId]=useState(null)

    let headers={
        token:localStorage.getItem('userToken')
    }
    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/Cart/${productId}`,{
            headers:headers
        })
        .then((response)=>{
            setCartCount(response?.data?.numOfCartItems);
            setCartId(response?.data?.data._id);
            return response;})
        .catch((error)=>error)
        
    }
    function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/Cart`,{
            headers:headers
        })
        .then((response)=>{ 
            setCartCount(0);
            setCartId(response?.data?.data._id);
            return response})
        .catch((error)=>error)
        
    }
    function updateCartItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/Cart/${productId}`,{
            count:count
        },{
            headers:headers
        })
        .then((response)=>{
            setCartCount(response?.data?.numOfCartItems);
            setCartId(response?.data?.data._id);
            return response})
        .catch((error)=>error)
       
    }
    function onlinePayment(shippingAddress) {
        const redirectUrl = `${window.location.origin}`;
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`, {
            shippingAddress: shippingAddress
        }, {
            headers: headers
        })
        .then((response) => {
            console.log(response?.data?.session?.url, "online");
            window.location.href = response?.data?.session?.url;
        })
        .catch((error) => {
            console.error(error);
        });
    }
    

    
    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId
        }
        ,{
            headers:headers
        })
        .then((response)=> {
            setCartCount(response?.data?.numOfCartItems);
            setCartId(response?.data?.data._id);
            return response}).catch((error)=> error)
    }

    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers:headers
        }).then((response)=>{
            setCartCount(response?.data?.numOfCartItems);
            setCartId(response?.data?.data._id);
            return response}).catch((error)=>error)
    }

    useEffect(() => {
        getCartItems().then(response => {
          if (response?.data) {
            setCartCount(response?.data?.numOfCartItems);
          }
        });
      }, []);
    

    return <CartContext.Provider value={{headers,cartCount,setCartCount,onlinePayment,addToCart,getCartItems,removeCartItem,updateCartItem, clearCart }}>
                {props.children}
        </CartContext.Provider>
    

}

