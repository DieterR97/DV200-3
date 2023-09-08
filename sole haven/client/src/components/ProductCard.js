import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const ProductCard = ({ imageUrl, name, price, discount, brand, id }) => {

    const discountedPrice = price - (price * (discount / 100));

    const viewProduct = (shoeID) => {
        localStorage.setItem("IndividualProduct", shoeID)
        window.location = "/IndividualProduct";
    };

    const updateProduct = (shoeID) => {
        localStorage.setItem("updateProductID", shoeID)
        window.location = "/UpdateProduct";
    };

    const deleteProduct = (shoeID) => {
        axios.delete('http://localhost:5000/api/shoe/' + shoeID)
        //! should reload be capital> Reload ?
        window.location.reload();
    };

    const aadmin = localStorage.getItem("isAdmin");

    return (
        <Card className='shadow' style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src={imageUrl} alt={name} /> */}
            <div className="card-img-container">
                <Card.Img variant="top" className='cardHover' src={imageUrl} alt={name} onClick={() => viewProduct(id)} />
            </div>
            <Card.Body>
                <Card.Title className='cardHover' onClick={() => viewProduct(id)}>{name}</Card.Title>
                <Card.Text className="text-muted">{brand}</Card.Text>
                <Card.Text className="card-text-container">
                    <span className="old-price">R {price.toFixed(2)}</span>
                    <span>R {discountedPrice.toFixed(2)}</span>
                </Card.Text>

                {aadmin &&
                    <div className='card-text-container'>
                        <Button variant="success" onClick={() => updateProduct(id)}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={() => deleteProduct(id)}>
                            Delete
                        </Button>
                    </div>
                }

            </Card.Body>
        </Card>
    );
};

export default ProductCard;
