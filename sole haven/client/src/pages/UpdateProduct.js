import React, { useEffect, useState } from 'react';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {

    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [sizes1, setSizes1] = useState();
    const [sizes2, setSizes2] = useState();
    const [sizes3, setSizes3] = useState();
    const [sizes4, setSizes4] = useState();
    const [sizes5, setSizes5] = useState();
    const [color1, setColor1] = useState();
    const [color2, setColor2] = useState();
    const [color3, setColor3] = useState();
    const [description, setDescription] = useState();
    const [gender, setGender] = useState();
    const [dateLaunched, setDateLaunched] = useState();
    const [price, setPrice] = useState();
    const [discountPercentage, setDiscountPercentage] = useState();
    const [imgUrl1, setImgUrl1] = useState();
    const [imgUrl2, setImgUrl2] = useState();
    const [imgUrl3, setImgUrl3] = useState();
    const [imgUrl4, setImgUrl4] = useState();
    const [stock, setStock] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const shoeID = localStorage.getItem("updateProductID");

        if (shoeID) {
            axios.get(`http://localhost:5000/api/shoe/${shoeID}`)
                .then((response) => {
                    const shoeData = response.data;
                    console.log(shoeData);

                    setBrand(shoeData.brand);
                    setModel(shoeData.model);
                    setSizes1(shoeData.sizes[0]);
                    setSizes2(shoeData.sizes[1]);
                    setSizes3(shoeData.sizes[2]);
                    setSizes4(shoeData.sizes[3]);
                    setSizes5(shoeData.sizes[4]);
                    setColor1(shoeData.color[0]);
                    setColor2(shoeData.color[1]);
                    setColor3(shoeData.color[2]);
                    setDescription(shoeData.description);
                    setGender(shoeData.gender);
                    setDateLaunched(shoeData.dateLaunched);
                    setPrice(shoeData.price);
                    setDiscountPercentage(shoeData.discountPercentage);
                    setImgUrl1(shoeData.imgUrl[0]);
                    setImgUrl2(shoeData.imgUrl[1]);
                    setImgUrl3(shoeData.imgUrl[2]);
                    setImgUrl4(shoeData.imgUrl[3]);
                    setStock(shoeData.stock);

                })
                .catch((error) => {
                    console.error('Error fetching shoe data:', error);
                });
        }
    }, []);

    const handleUpdate = () => {

        const payload = {
            brand: String(brand), // Convert to String
            model: String(model), // Convert to String
            sizes: [String(sizes1), String(sizes2), String(sizes3), String(sizes4), String(sizes5)], // Convert to String
            color: [String(color1), String(color2), String(color3)], // Convert to String
            description: String(description), // Convert to String
            gender: String(gender), // Convert to String
            dateLaunched: new Date(dateLaunched), // Convert to Date
            price: parseFloat(price), // Convert to Number
            discountPercentage: parseFloat(discountPercentage), // Convert to Number
            imgUrl: [String(imgUrl1), String(imgUrl2), String(imgUrl3), String(imgUrl4)], // Convert to String
            stock: parseInt(stock), // Convert to Number
        };

        try {
            const shoeID = localStorage.getItem("updateProductID");

            const response = axios.put(`http://localhost:5000/api/shoe/${shoeID}`, payload);
            console.log('Shoe data updated:', response);

            // window.location = "/";
            navigate("/")

        } catch (error) {
            console.error('Error submitting shoe data:', error);
        }

        localStorage.removeItem("updateProductID");
        window.location = "/";
    };

    return (
        <div>

            <Container><h1 className="title-shadow">Edit Shoe Data for: {model}</h1></Container>

            <Container>
                <Form onSubmit={handleUpdate}>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            name="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="text"
                            name="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="sizes1">
                        <Form.Label>Sizes 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes1"
                            value={sizes1}
                            onChange={(e) => setSizes1(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="sizes2">
                        <Form.Label>Sizes 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes2"
                            value={sizes2}
                            onChange={(e) => setSizes2(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="sizes3">
                        <Form.Label>Sizes 3</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes3"
                            value={sizes3}
                            onChange={(e) => setSizes3(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="sizes4">
                        <Form.Label>Sizes 4</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes4"
                            value={sizes4}
                            onChange={(e) => setSizes4(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="sizes5">
                        <Form.Label>Sizes 5</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes5"
                            value={sizes5}
                            onChange={(e) => setSizes5(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="color1">
                        <Form.Label>Color 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="color1"
                            value={color1}
                            onChange={(e) => setColor1(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="color2">
                        <Form.Label>Color 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="color2"
                            value={color2}
                            onChange={(e) => setColor2(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="color3">
                        <Form.Label>Color 3</Form.Label>
                        <Form.Control
                            type="text"
                            name="color3"
                            value={color3}
                            onChange={(e) => setColor3(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="text"
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="dateLaunched">
                        <Form.Label>Date Launched</Form.Label>
                        <Form.Control
                            type="text"
                            name="dateLaunched"
                            value={dateLaunched}
                            onChange={(e) => setDateLaunched(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="discountPercentage">
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control
                            type="number"
                            name="discountPercentage"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="imgUrl1">
                        <Form.Label>Image URL 1</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl1"
                            value={imgUrl1}
                            onChange={(e) => setImgUrl1(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="imgUrl2">
                        <Form.Label>Image URL 2</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl2"
                            value={imgUrl2}
                            onChange={(e) => setImgUrl2(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="imgUrl3">
                        <Form.Label>Image URL 3</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl3"
                            value={imgUrl3}
                            onChange={(e) => setImgUrl3(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="imgUrl4">
                        <Form.Label>Image URL 4</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl4"
                            value={imgUrl4}
                            onChange={(e) => setImgUrl4(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <br/>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
                <br/>
                <br/>
            </Container>

        </div>
    )
}

export default UpdateProduct;