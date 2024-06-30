import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true)

  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data);
        setLoading(false)
      })
      .catch((errors) => {});
  }

  useEffect(() => {
    getBrands();
  }, []);
  if(loading){
    return <div className="flex items-center justify-center"><i className="fa fa-spinner fa-spin fa-4x text-green-600" ></i></div>
  }
  return (
    <><h2 className="text-center font-serif font-semibold text-2xl mt-5 text-green-600">Brands</h2>
      <div className="row">
        
        {brands.map((brand) => (
          <div className="w-1/6 px-4 py-4">
            <div className="brand relative border border-slate-400 rounded-md py-10 px-4">
              <Link to={`/branddetails/${brand?._id}`}>
              <img key={brand.id} src={brand?.image} alt={brand?.name} className=' w-full'/>

              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

