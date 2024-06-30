import { Formik, useFormik } from "formik";
import React, { useContext } from 'react';
import { CartContext } from "../../context/CartContext";

export default function Checkout() {
    let { onlinePayment } = useContext(CartContext);

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: (values, { setSubmitting }) => {
            payNow(values);
            setSubmitting(false);
        }
    });

    async function payNow(values) {
        await onlinePayment(values);
    }

    return (
        <>
            <h2 className='my-4 text-green-500 font-semibold text-2xl'>Shipping Address</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    onChange={formik.handleChange}
                    name="city"
                    value={formik.values.city}
                    type="text"
                    className='form-control w-full border border-gray-500 autoFocus indent-2 mb-3 autoFocus rounded-md'
                    placeholder='City'
                />
                <input
                    onChange={formik.handleChange}
                    name="phone"
                    value={formik.values.phone}
                    type="tel"
                    className='form-control border border-gray-500 autoFocus w-full indent-2 mb-3 autoFocus rounded-md'
                    placeholder='Phone'
                />
                <textarea
                    onChange={formik.handleChange}
                    name='details'
                    value={formik.values.details}
                    className='form-control w-full border border-gray-500 autoFocus indent-2 rounded-md'
                    placeholder='Details'
                />
                <button
                    type="submit"
                    className='bg-green-600 mr-2 text-white px-2 py-2 font-semibold rounded-md'
                    onClick={() => formik.setSubmitting(true)}
                >
                    Cash Order
                </button>
                <button
                    type="button"
                    className='bg-green-500 text-white px-2 py-2 font-semibold rounded-md'
                    onClick={() => payNow(formik.values)}
                >
                    Online Order
                </button>
            </form>
        </>
    );
}
