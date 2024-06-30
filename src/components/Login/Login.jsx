import React, { useContext, useEffect, useState } from 'react';
import Style from './Login.module.css';
import { Formik, useFormik, validateYupSchema } from "formik";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';



export default function Login() {
  let {setUserLogin} = useContext(UserContext)
  let validationSchema= Yup.object().shape({
    email:Yup.string().email('**Email is invalid').required('**Email is required'),
    password:Yup.string().matches(/^[A-Z][a-z]{5,10}$/,' **Password must start with uppercase').required('**Password is required'),
  })


  let navigate= useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(formValues){
    setIsLoading(true)
    // handleRegister takes parameter that has form values.The parameter called from Values has the values written in the form by the user.
    // the handle register prevent the default behaviour and then call the handle register tht has its own parameter. 
    //console.log(formValues); 
    // fromValues will be send to the database
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues) 
    .then((response) => {
      if (response.data.message === "success") {
        localStorage.setItem("userToken", response.data.token);
        setUserLogin(response.data.token)
        navigate("/");
        setIsLoading(false);
      }
    } )
    .catch((apiError)=>{
      setIsLoading(false)
      setapiError(apiError?.response?.data?.message);

    })
    /*if(data.message === 'success'){

      navigate("/login")*/

    
  }
  // the Formik hook takes an objects with objects
  let formik = useFormik({
    // the initial values of the form, they are empty strings. 
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema, // key = value
    onSubmit:handleLogin
  })
  useEffect(() => {}, []);
  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
      {apiError?<div className="text-red-600 text-sm font-bold indent-3 my-2  p-4 bg-red-200 ">{apiError}</div>:null}
        <h2 className="text-green-600 font-bold mb-6 text-2xl ">
          Login Now
        </h2>

        <form onSubmit={formik.handleSubmit} className='sm:ml-2 md:ml-2'>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>

            {formik.touched.email && formik.errors.email? (<div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">{formik.errors.email}</div>
            ):null}
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
            {formik.touched.password && formik.errors.password?(<div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">{formik.errors.password}</div>
            ):null}
          </div>

          <div className="flex items-center">
            <button
            type="submit"
            className="text-white text-md font-semibold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  rounded-lg  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            
            {isLoading?<i className="fas fa-spinner fa-spin"></i>:"Login"}
            
          </button>
          <p className='pl-2'>Did not have account yet? <span className='font-semibold'> <Link to={'/register'}> Register Now</Link></span></p>

          </div>
          
          
        </form>
      </div>
      
    </>
  );
}
