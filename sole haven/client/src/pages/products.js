import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Import Form component for the dropdown
import ProductCard from "../components/ProductCard";
import '../css/product-container.css';

function Products() {
    const [shoes, setShoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [genderFilter, setGenderFilter] = useState(null);
    const [brandFilter, setBrandFilter] = useState(null); // Add brand filter state

    useEffect(() => {
        axios.get('http://localhost:5000/api/shoes')
            .then(result => {
                setShoes(result.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    // Function to handle gender filtering
    const handleGenderFilter = (gender) => {
        setGenderFilter(gender);
        setBrandFilter(null); // Reset brand filter when changing gender
    };

    // Function to show all products (clear the filter)
    const handleShowAll = () => {
        setGenderFilter(null);
        setBrandFilter(null); // Clear brand filter
    };

    // Function to handle brand filter
    const handleBrandFilter = (event) => {
        setBrandFilter(event.target.value);
        setGenderFilter(null); // Reset gender filter when changing brand
    };

    // Filter the shoes based on the selected gender and brand
    const filteredShoes = shoes.filter((shoe) => {
        if (genderFilter && shoe.gender.toLowerCase() !== genderFilter.toLowerCase()) {
            return false;
        }
        if (brandFilter && shoe.brand !== brandFilter) {
            return false;
        }
        return true;
    });

    // Get unique brands from the shoes array
    const uniqueBrands = [...new Set(shoes.map((shoe) => shoe.brand))];

    return (
        <div>
            <Container><h1 className="title-shadow">All Products</h1></Container>
            <Container>
                <div className="filter-container">
                    <div className="filter-buttons">
                        <Button onClick={handleShowAll} className='filter-btn'>All</Button>
                        <Button onClick={() => handleGenderFilter('Men')} className='filter-btn'>Men</Button>
                        <Button onClick={() => handleGenderFilter('Women')} className='filter-btn'>Women</Button>
                    </div>
                    {/* Add brand filter dropdown */}
                    <Form.Group className="form-group">
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control as="select" onChange={handleBrandFilter} value={brandFilter || ''}>
                            <option value="">All</option>
                            {uniqueBrands.map((brand, index) => (
                                <option key={index} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <br/>
                <br/>
                <Row>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {filteredShoes.map((shoe) => (
                                <Col key={shoe._id} className="card-bottom-margin">
                                    <ProductCard
                                        imageUrl={shoe.imgUrl[0]}
                                        name={shoe.model}
                                        price={shoe.price}
                                        discount={shoe.discountPercentage}
                                        brand={shoe.brand}
                                        id={shoe._id}
                                    />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Products;
