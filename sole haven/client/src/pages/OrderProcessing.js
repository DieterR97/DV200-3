import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from '../components/VerticalNavbar';
import Order from '../components/Order';
import testShoeImg2 from "../assets/sneakers/Sneaker2.jpg"

function OrderProcessing() {

    // const [orders, setOrders] = useState([
    //     {
    //         id: 1,
    //         product: 'Sample Product 1',
    //         quantity: 3,
    //         customer: 'John Doe',
    //     },
    //     {
    //         id: 2,
    //         product: 'Sample Product 2',
    //         quantity: 2,
    //         customer: 'Jane Smith',
    //     },
    //     // Add more orders here if needed
    // ]);

    const [orders, setOrders] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders')
            .then(result => {

                setOrders(result.data);

                setIsLoading(false); // Data is loaded, set isLoading to false
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Handle error and set isLoading to false
            });
    }, []);

    return (
        <div>
            <Container>
                <h2 className="title-shadow">Order Processing</h2>

                <Container>
                    <Row>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                    {orders.map((order) => (
                                        <Col key={order._id} className="card-bottom-margin">
                                            <Order
                                                // imageUrl={order.imageUrl}
                                                imageUrl={order.mainImage}
                                                price={order.price}
                                                discount={order.discountPercentage}
                                                brand={order.brand}
                                                id={order._id}
                                                model={order.model}
                                                user={order.User}
                                                size={order.Size}
                                                amount={order.Amount}
                                                dateOrdered={order.orderDate}
                                            />
                                        </Col>
                                    ))}
                            </>
                        )}

                    </Row>
                </Container>

            </Container>

        </div>

    )
}

export default OrderProcessing;