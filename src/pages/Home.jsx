import React from 'react'
import Banner from '../components/Home/Banner'
import DisplayProduct from '../components/Products/DisplayProduct'
import ProductsContainer from '../components/Home/ProductsContainer'

const Home = () => {
  return (
    <div className=' pt-6 '>
        <Banner/>
        <ProductsContainer/>
    </div>
  )
}

export default Home