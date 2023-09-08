import React from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Order = ({ imageUrl, price, discount, brand, id, model, user, size, amount, dateOrdered }) => {

    const discountedPrice = price - (price * (discount / 100));

    const onDispatch = (orderId) => {
        axios.delete('http://localhost:5000/api/order/' + orderId)
        window.location = "/OrderProcessing";
    };

    return (
        <Card className='shadow cardHover' style={{ width: '18rem' }}>
            <div className="card-img-container">
                <Card.Img variant="top" src={imageUrl} alt={user} />
            </div>
            <Card.Body>
                <Card.Title>{user}</Card.Title>
                <Card.Text className="text-muted">{brand} - {model}</Card.Text>
                <Card.Text>
                    <span>Size: {size}</span>
                    <br/>
                    <span>Amount: {amount}</span>
                    <br />
                    <span className="old-price">R {price.toFixed(2)}</span>
                    <br />
                    <span>R {discountedPrice.toFixed(2)}</span>
                    <br />
                    <span>Date: {dateOrdered}</span>
                </Card.Text>
                <Button variant="danger" onClick={() => onDispatch(id)}>
                    Dispatch
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Order;

