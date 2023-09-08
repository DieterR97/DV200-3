import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InventoryManagement() {

    const [shoes, setShoes] = useState([]);
    const [shoeStockChange, setShoeStockChange] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleStockUpdate = (shoeID) => {

        const payload = {
            stock: parseInt(shoeStockChange), // Convert to Number
        };

        try {
            const response = axios.put(`http://localhost:5000/api/shoe/${shoeID}`, payload);
            console.log('Shoe data updated:', response);

            // window.location = "/";
            navigate("/InventoryManagement")

        } catch (error) {
            console.error('Error submitting shoe data:', error);
        }
        window.location = "/InventoryManagement";
    };

    return (
        <Container>
            <h1 className="title-shadow">Inventory Management</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Current Stock</th>
                            <th>Change Stock To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.map((shoe, index) => (
                            <tr key={index}>
                                <td>{shoe.brand}</td>
                                <td>{shoe.model}</td>
                                <td>{shoe.stock}</td>
                                <td>
                                    <input
                                        type="number"
                                        name='stock'
                                        // value={shoeStockChange}
                                        onChange={(e) => setShoeStockChange(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => handleStockUpdate(shoe._id)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        <br/>
        <br/>
        <br/>
        </Container>
    );
}

export default InventoryManagement;
