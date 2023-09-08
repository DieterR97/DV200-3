import React from 'react';
// import Route and Routes
import { Route, Routes } from 'react-router-dom';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from '../components/VerticalNavbar';
import InventoryManagement from './InventoryManagement';
import OrderProcessing from './OrderProcessing';

function AdministratorPages() {

    return (
        <div>
            {/* <VerticalNavbar /> */}
            {/* Routes, Route for each different page */}
            {/* <Routes>
                <Route path='/InventoryManagement' element={<InventoryManagement />} ></Route>
                <Route path='/OrderProcessing' element={<OrderProcessing />} ></Route>
            </Routes> */}
            {/* Add the rest of your content here */}
        </div>

    )
}

export default AdministratorPages;