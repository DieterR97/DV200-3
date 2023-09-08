import React, { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import '../css/product-container.css';
import shoePlaceholder from '../assets/img/shoe-placeholder.png';

const ProductContainer = ({ shoeID }) => {

    const user = localStorage.getItem("token");

    const [shoe, setShoe] = useState([]);

    const [availableSizes, setAvailableSizes] = useState([]);
    const [colorsIncluded, setColorsIncluded] = useState([]);

    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState([]);
    const [price, setPrice] = useState([]);
    const [discountPercentage, setDiscountPercentage] = useState([]);
    const [mainImage, setMainImage] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/shoe/' + shoeID;
        // axios.get('http://localhost:5000/api/shoe/64f485c830113b2fb4fa278d')
        axios.get(apiUrl)
            .then(result => {
                setShoe(result.data);
                setAvailableSizes(result.data.sizes);
                setColorsIncluded(result.data.color);

                setBrand(result.data.brand);
                setModel(result.data.model);
                setPrice(result.data.price);
                setDiscountPercentage(result.data.discountPercentage);
                setMainImage(result.data.imgUrl[0]);

                setIsLoading(false); // Data is loaded, set isLoading to false
                // Check if imgUrl is defined and not empty
                if (result.data.imgUrl && result.data.imgUrl.length > 0) {
                    setMainImageSrc(result.data.imgUrl[0]);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Handle error and set isLoading to false
            });
    }, []);

    const { imgUrl } = shoe;

    const discountedPrice = shoe.price - (shoe.price * (shoe.discountPercentage / 100));

    const [mainImageSrc, setMainImageSrc] = useState(shoePlaceholder);

    const handleMouseHover = (newImageSrc) => {
        setMainImageSrc(newImageSrc);
    };

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const [cart, setCart] = useState([]);

    const handleAddToCart = () => {

        const addShoe = {
            Amount: quantity,
            Size: selectedSize,
            User: localStorage.getItem("userEmail"),
            brand: brand,
            model: model,
            price: price,
            discountPercentage: discountPercentage,
            mainImage: mainImage
        }

        // Load the existing cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new shoe to the cart
        const updatedCart = [...existingCart, addShoe];

        // Update the state with the new cart
        setCart(updatedCart);

        // Store the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        console.log(localStorage.getItem('cart'));
    };

    return (
        <div>

            {/* <!-- Main item container --> */}
            <main className="item">

                <section className="img">

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <img src={mainImageSrc} alt="Product" className="img-main" />

                            <div className="img-btns">

                                {imgUrl.map((image, index) => (
                                    <button
                                        key={index}
                                        className="img-btn"
                                        onMouseEnter={() => handleMouseHover(image)}
                                    >
                                        <img src={image} alt={`shoe product ${index + 1}`} className="img-btn__img" />
                                    </button>
                                ))}

                            </div>
                        </>
                    )}

                </section>

                <section className="price">


                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>

                            <h2 className="price-sub__heading">{shoe.brand} - {shoe.gender}</h2>
                            <h1 className="price-main__heading">{shoe.model}</h1>
                            <p className="price-txt">{shoe.description}</p>
                            <div className="price-box">
                                <div className="price-box__main">
                                    <span className="price-box__main-new">R {discountedPrice.toFixed(2)}</span>
                                    <span className="price-box__main-discount">{shoe.discountPercentage}% OFF</span>
                                </div>
                                <span className="price-box__old old-price">R {shoe.price.toFixed(2)}</span>
                            </div>

                            <div className="size-selector">
                                {availableSizes && availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        US {size}
                                    </button>
                                ))}
                            </div>

                            <div className='circle-container'>
                                {colorsIncluded.map((color) => (
                                    <div className='circle'
                                        key={color}
                                        style={{ backgroundColor: color, marginRight: '10px' }}
                                    >
                                        {/* {color} */}
                                    </div>
                                ))}
                            </div>

                            <div className="amount-container">

                                <InputGroup className='inp'>
                                    <Button variant="outline-secondary" onClick={handleDecrease} className='price-btns'>
                                        -
                                    </Button>
                                    <FormControl
                                        aria-label="Quantity"
                                        value={quantity}
                                        readOnly
                                        className="price-btn__txt price-btns"
                                    />
                                    <Button variant="outline-secondary" onClick={handleIncrease} className='price-btns'>
                                        +
                                    </Button>
                                </InputGroup>

                                {user &&
                                    <Button variant="primary" onClick={handleAddToCart} className="price-cart__btn btn--orange add-cart-btn">
                                        <FaShoppingCart /> Add to cart
                                    </Button>
                                }

                                {!user &&
                                        <Button variant="secondary" className="price-cart__btn btn--grey add-cart-btn">
                                        <FaShoppingCart /> Add to cart
                                    </Button>
                                }

                            </div>

                        </>
                    )}


                </section>


            </main>

        </div>
    );
};

export default ProductContainer;
