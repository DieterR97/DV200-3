import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

const products = JSON.parse(localStorage.getItem('cart'));

const Cart = () => {
    // Calculate totals
    const totalWithoutDiscount = products.reduce(
        (total, product) => total + product.price * product.Amount,
        0
    );

    const totalDiscount = products.reduce(
        (total, product) =>
            total + (product.price * product.discountPercentage) / 100 * product.Amount,
        0
    );

    const totalAfterDiscount = totalWithoutDiscount - totalDiscount;

    const navigate = useNavigate();

    const handleAddToOrders = async () => {
        try {
            const orderPromises = products.map(async (product) => {
                const payload = {
                    Amount: product.Amount,
                    Size: product.Size,
                    User: product.User,
                    brand: product.brand,
                    model: product.model,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    mainImage: product.mainImage
                };

                const response = await axios.post('http://localhost:5000/api/order', payload);
                console.log('Order data submitted:', response.data);
            });

            await Promise.all(orderPromises);

            console.log('All orders submitted successfully.');

            // Redirect to a new page or perform any other actions after all requests are completed.
            // window.location = "/";
            navigate("/");

        } catch (error) {
            console.error('Error submitting order data:', error);
        }
        localStorage.removeItem("cart");
    };


    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h2 className='title-shadow'>Your Cart</h2>
                    {products.map((product) => (
                        <div key={product.id} className="cart-item">
                            <div className='imgDiv'>
                                <Image src={product.mainImage} alt={`${product.brand} ${product.model}`} className='img200' />
                            </div>
                            <div className="product-details">
                                <h3>{product.brand} - {product.model}</h3>
                                <p>Size: {product.Size}</p>
                                <p>Price: ${product.price}</p>
                                <p>Discount: {product.discountPercentage}%</p>
                                <p>Price after discount: ${product.price - (product.price * product.discountPercentage) / 100}</p>
                                <p>Amount: {product.Amount}</p>
                            </div>
                        </div>
                    ))}
                </Col>
                <Col md={4}>
                    <div className='cart-summary'>
                        <h2>Cart Summary</h2>
                        <p>Total without discount: ${totalWithoutDiscount.toFixed(2)}</p>
                        <p>Total Discount: ${totalDiscount.toFixed(2)}</p>
                        <p>Total after Discount: ${totalAfterDiscount.toFixed(2)}</p>
                        <Button variant="primary" className='btn--orange' onClick={handleAddToOrders}>Checkout</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
