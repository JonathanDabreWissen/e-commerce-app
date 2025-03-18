import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import Product from "./pages/Product";
import Vendor from "./pages/Vendor";
import Inventory from "./pages/Inventory";
import Customer from "./pages/Customer";
import OrderManagement from "./pages/OrderManagement";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import store from "./reduxContainer/store";



function App() {
  return (
    <Provider store={store}>
      <Router>

        <Navbar/>
        <div className=" pt-12 pb-40 px-16 bg-[#e8eaec]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />



            {/* Admin Routes */}
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/vendors" element={<Vendor/>} />
            <Route path="/admin/inventory" element={<Inventory/>} />
            <Route path="/admin/orders" element={<OrderManagement/>} />
            <Route path="/admin/customers" element={<Customer/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
