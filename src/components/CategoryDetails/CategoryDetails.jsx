import React, { useEffect, useState } from 'react';
import style from './CategoryDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoryDetails() {
  const [categoryDetails, setCategoryDetails] = useState(null);
  let { _id } = useParams();

  console.log({ _id });

  function getCategoryDetails(_id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${_id}`)
      .then(({ data }) => {
        console.log("API response data:", data);
        // Check if the response data is in the expected format
        if (Array.isArray(data.data)) {
          setCategoryDetails(data.data);
        } else {
          setCategoryDetails([data.data]); // Convert to array if it's a single object
        }
      })
      .catch((error) => {
        console.error("Error fetching brand details:", error);
      });
  }

  useEffect(() => {
    if (_id) {
      getCategoryDetails(_id);
    }
  }, [_id]);

  if (!categoryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        {categoryDetails.map((category) => (
          <React.Fragment key={category._id}>
            
            <div className="w-1/4">
              
              <img className='border border-x-4 border-y-4 border-b-green-400 border-t-red-400 border-l-orange-600 border-r-teal-500' src={category?.image} alt={category?.name} />
            </div>
            <div className="w-3/4">
              <h4 className='py-3'><span className='font-semibold pr-5 text-sky-800'></span>{category?.name}</h4>
            </div>

          </React.Fragment>
        ))}
      </div>
    </>
  );
}
