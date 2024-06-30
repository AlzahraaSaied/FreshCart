import React, { useContext, useEffect, useState } from "react";
import Style from "./Register.module.css";
import { Formik, useFormik, validateYupSchema } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  let {setUserRegister} = useContext(UserContext);
  
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "**Name must be at least 3 characters")
      .max(20, "**Name must not exceed 20 characters")
      .required("**Name is required"),
    email: Yup.string()
      .email("**Email is invalid")
      .required("**Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z]{5,10}$/, " **Password must start with uppercase")
      .required("**Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "**Passwords must be matched")
      .required("**Confirming Password is required"),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "**Phone number must be a valid egyptian phone"
      )
      .required("**Phone number is required"),
  });

  let navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(formValues) {
    setIsLoading(true);
    // handleRegister takes parameter that has form values.The parameter called from Values has the values written in the form by the user.
    // the handle register prevent the default behaviour and then call the handle register tht has its own parameter.
    //console.log(formValues);
    // fromValues will be send to the database
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserRegister(response.data.token)
          navigate("/login");
          setIsLoading(false);
        }
      })
      .catch((apiError) => {
        setIsLoading(false);
        setapiError(apiError?.response?.data?.message);
      });
    /*if(data.message === 'success'){

      navigate("/login")*/
  }
  // the Formik hook takes an objects with objects
  let formik = useFormik({
    // the initial values of the form, they are empty strings.
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema, // key = value
    onSubmit: handleRegister,
  });
  useEffect(() => {}, []);
  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
        {apiError ? (
          <div className="text-red-600 text-sm font-bold indent-3 my-2  p-4 bg-red-200 ">
            {apiError}
          </div>
        ) : null}
        <h2 className="text-green-600 font-bold mb-6 text-2xl ">
          FreshCart Registration Form
        </h2>
        <p className="text-gray-700 pb-6 indent-2 ">
          Please fill the following form with your personal information
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500 block"
                  : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>

            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rePassword"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.rePassword && formik.errors.rePassword
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your rePassword
            </label>
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone
            </label>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-600 text-sm font-bold indent-3 mt-3 p-3 bg-red-200 ">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
