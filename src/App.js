import Product from './pages/Product';
import { BrowserRouter, Routes, Route } from "react-router";




function App() {
  return (
    <div className="-mt-8 pt-10 px-20 bg-[#e5e5e5] pb-48 ">
      <h1 className='text-4xl font-semibold mt-6 mb-10'>Flipazon Admin</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route path="/random" element={<p>Hi random</p>} />
        </Routes>
      </BrowserRouter>
      {/* <ProductCard name={"Electric Guitar"} category={"Musical Instrument"} price={29999} vendor_id={107} brand={"Fender"} rating={4.6}/> */}
    </div>
  );
}

export default App;
