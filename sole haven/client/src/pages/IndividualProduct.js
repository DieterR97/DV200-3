import React from "react";
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import ProductContainer from "../components/ProductContainer";

function test() {

    const individualShoe = localStorage.getItem("IndividualProduct");
    return (
        <div>

            <ProductContainer shoeID={individualShoe} />

        </div>
    )
}

// export test component
export default test;