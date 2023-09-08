import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from "../assets/slider_img/slider1.jpg";
import slide2 from "../assets/slider_img/slider2.jpg";
import slide3 from "../assets/slider_img/slider3.jpg";


const CarouselTop = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 className='sliderTitle'>Step into Style</h3>
                    <p className='sliderDescrption'>Discover the latest collection of sneakers that blend fashion and functionality. Elevate your everyday look with our comfortable and trendy designs, perfect for any occasion.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3 className='sliderTitle'>Unleash Your Potential</h3>
                    <p className='sliderDescrption'>Unlock your full potential with sneakers designed for performance. From running to training, our shoes provide the support and durability you need to crush your goals.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3 className='sliderTitle'>Sneaker Essentials</h3>
                    <p className='sliderDescrption'>Explore our curated selection of must-have sneakers. From classic white kicks to bold statement pieces, find the perfect pair to complete your wardrobe and express your unique style.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselTop;
