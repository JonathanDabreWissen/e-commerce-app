import React, { useEffect, useState } from 'react'
import useGetData from '../hooks/useGetData';
import ProductCard from '../components/Products/ProductCard';

const Product = () => {

    const { data, loading, error } = useGetData("products");
    const {data: vendors, loading: vendorLoading, error: vendorError} = useGetData("vendors");

    const [vendorMap, setVendorMap] = useState({});

    useEffect(() => {
        if (vendors?.length) {
          const map = vendors.reduce((acc, vendor) => {
            acc[vendor.id] = vendor.name;
            return acc;
          }, {});
          setVendorMap(map);
        }
      }, [vendors]);

    if (loading || vendorLoading) return <p>Loading...</p>;
    if (error || vendorError) return <p>Error: {error || vendorError}</p>;

    return (
        <div className='py-10'>
            <h1 className='text-2xl font-semibold'>Explore Products</h1>
            <div className="product-container mt-5 flex flex-wrap w-full gap-3">
                {data?.map((product)=>{
                    return(
                        <div key={product.id} className="">
                            <ProductCard name={product.name} brand={product.brand} category={product.category} price={product.price} rating={product.rating} vendor={vendorMap[product.vendor_id]}/>
                        </div>
                    )
                })}

            </div>


        </div>
    )
}

export default Product