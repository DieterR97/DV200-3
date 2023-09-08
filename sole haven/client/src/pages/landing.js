import React, { useEffect, useState } from 'react';
import CarouselTop from "../components/CarouselTop";
import WelcomeSection from "../components/WelcomeSection";
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import testShoeImg1 from "../assets/sneakers/Sneaker1.jpg"
import testShoeImg2 from "../assets/sneakers/Sneaker2.jpg"
import axios from 'axios';

function Landing() {

    const [shoes, setShoes] = useState([]);
    const [shoes5Recent, setShoes5Recent] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('http://localhost:5000/api/shoes')
            .then(result => {

                const sortedShoesByDiscount = result.data.sort((a, b) => b.discountPercentage - a.discountPercentage);
                setShoes(sortedShoesByDiscount);
                // setShoes(result.data);
                console.log(result.data);
                console.log(sortedShoesByDiscount);

                const sortedShoes = result.data.sort((a, b) => new Date(b.dateLaunched) - new Date(a.dateLaunched));
                const recentShoes = sortedShoes.slice(0, 5); // Get the 5 most recent shoes
                setShoes5Recent(recentShoes);

                setIsLoading(false); // Data is loaded, set isLoading to false
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Handle error and set isLoading to false
            });
    }, []);

    return (
        <div>
            <CarouselTop />
            <WelcomeSection />

            <Container><h1 className="title-shadow">Newest Products</h1></Container>

            <Container>
                <Row>


                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>

                            {shoes5Recent.map((shoe) => (
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

            <Container><h1 className="title-shadow">Discounted Products</h1></Container>

            <Container>
                <Row>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>

                            {shoes.map((shoe) => (
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

        </div>
    )
}

// export Landing component
export default Landing;