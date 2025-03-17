import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import Vendor from "./pages/Vendor";
import Inventory from "./pages/Inventory";



function App() {
  return (
    <Router>
      <Navbar />
      <div className=" px-20">
        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/vendors" element={<Vendor/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/orders" element={<h1>Orders</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
