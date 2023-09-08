import React from 'react';
import './App.css';
// import Route and Routes
import { Route, Routes } from 'react-router-dom';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar';
// import all pages
import Landing from './pages/landing';
import Products from './pages/products';
import IndividualProduct from './pages/IndividualProduct';
import AdministratorPages from './pages/AdministratorPages';
import InventoryManagement from './pages/InventoryManagement';
import OrderProcessing from './pages/OrderProcessing';
import Cart from './pages/cart';
import UpdateProduct from './pages/UpdateProduct';
import AddProduct from './pages/AddProduct';
import Test from './pages/test';


function App() {
  // const user = localStorage.getItem("token");

  return (
    <div className="App">
      {/* Navbar component to show on all pages */}
      <TopNavBar />
      {/* Routes, Route for each different page */}
      <Routes>
        <Route path='/' element={<Landing />} ></Route>
        <Route path='/Products' element={<Products />} ></Route>
        <Route path='/IndividualProduct' element={<IndividualProduct />} ></Route>
        <Route path='/AdministratorPages' element={<AdministratorPages />} ></Route>
        <Route path='/InventoryManagement' element={<InventoryManagement />} ></Route>
        <Route path='/OrderProcessing' element={<OrderProcessing />} ></Route>
        <Route path='/cart' element={<Cart />} ></Route>
        <Route path='/UpdateProduct' element={<UpdateProduct />} ></Route>
        <Route path='/AddProduct' element={<AddProduct />} ></Route>
        <Route path='/test' element={<Test />} ></Route>
      </Routes>
      {/* Add the rest of your content here */}
    </div>
  );
}

export default App;
