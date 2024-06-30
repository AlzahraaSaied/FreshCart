import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BrandDetails() {
  const [brandDetails, setBrandDetails] = useState(null);
  let { _id } = useParams();

  console.log({ _id });

  function getBrandDetails(_id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${_id}`)
      .then(({ data }) => {
        console.log("API response data:", data);
        // Check if the response data is in the expected format
        if (Array.isArray(data.data)) {
          setBrandDetails(data.data);
        } else {
          setBrandDetails([data.data]); // Convert to array if it's a single object
        }
      })
      .catch((error) => {
        console.error("Error fetching brand details:", error);
      });
  }

  useEffect(() => {
    if (_id) {
      getBrandDetails(_id);
    }
  }, [_id]);

  if (!brandDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        {brandDetails.map((brand) => (
          <React.Fragment key={brand._id}>
            <div className="w-1/4">
              
              <img className='border border-x-4 border-y-4 border-b-green-400 border-t-red-400 border-l-orange-600 border-r-teal-500' src={brand?.image} alt={brand?.name} />
            </div>
            <div className="w-3/4">
              <h4 className='py-3'><span className='font-semibold pr-1 text-sky-800'>Brand:</span>{brand?.name}</h4>
              <p>With a commitment to quality and user satisfaction, these brands showcase their offerings on e-commerce platforms, providing a seamless shopping experience for customers worldwide. Whether it's cutting-edge technology, fashion-forward apparel, or artisanal goods, brands leverage e-commerce channels to connect with audiences, delivering value and convenience at every click.</p>

            </div>

          </React.Fragment>
        ))}
      </div>
    </>
  );
}
