import React from 'react'
import useGetData from '../../hooks/useGetData';
import ProductCard from './ProductCard';

const ProductsContainer = () => {
    const { data, loading, error, refetch } = useGetData("products"); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='p-8 bg-white mt-10 rounded-3xl'>
            <div className="text-3xl font-semibold mb-5">
                Explore Our Products
            </div>
            <div className="flex flex-wrap w-full gap-6">
                {data?.map((product) => (
                        <ProductCard id={product.id} name={product.name} category={product.category} price={product.price} brand={product.brand} rating={product.rating} />
                    ))           
                }           
            </div>

        </div>
    )
}

export default ProductsContainer