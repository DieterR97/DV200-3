import React, { useEffect, useState } from 'react';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import cartImage from '../assets/img/icon-cart.svg';
import menu from '../assets/img/icon-menu.svg';
import logo from '../assets/img/logo.svg';
// import person from '../assets/img/image-avatar.png';
import person from '../assets/img/image-avatar.jpg';

const TopNavBar = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
    };

    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const toggleSignUpModal = () => {
        setShowSignUpModal(!showSignUpModal);
    };

    const user = localStorage.getItem("token");
    const cart = localStorage.getItem("cart");

    const userImage = localStorage.getItem("profileImage");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("cart");
        localStorage.removeItem("IndividualProduct");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("userEmail");
        window.location.reload();
    };

    const gotoCart = () => {
        const cart = localStorage.getItem("cart");
        if (typeof cart !== 'undefined' && cart !== null) {
            window.location = '/cart';
        } else {
            alert('Your cart is empty.');
        }
    };

    const aadmin = localStorage.getItem("isAdmin");

    return (
        <div>

            {/* <!-- Header --> */}
            <header className="head">
                <div className="head-lft">
                    <button className="head-lft__btn">
                        <img
                            src={menu}
                            alt="menu image"
                            className="head-lft__btn-img"
                        />
                    </button>
                    <img src={logo} alt="logo" className="head-logo logo-size" href="/" />
                    <ul className="head-nav">
                        <li className="head-nav__item"><a href="/">Home</a></li>
                        <li className="head-nav__item"><a href="/#about">About</a></li>
                        <li className="head-nav__item"><a href="/Products">Products</a></li>
                        {/* <li className="head-nav__item"><a href="/about">About</a></li>
                        <li className="head-nav__item"><a href="/contact">Contact</a></li> */}
                    </ul>

                    {aadmin &&
                        <Nav className='navDropdown'>
                            <NavDropdown title="Administrator Pages" id="basic-nav-dropdown" className="head-nav__item">
                                <NavDropdown.Item href="/AddProduct">Add Product</NavDropdown.Item>
                                <NavDropdown.Item href="/InventoryManagement">Inventory Management</NavDropdown.Item>
                                <NavDropdown.Item href="/OrderProcessing">Order Processing</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    }

                </div>

                <div className="head-rgt">

                    <ul className="head-nav move-down-nav">
                        {!user && <li className="head-nav__item"><a onClick={toggleLoginModal}>Login</a></li>}
                        {!user && <li className="head-nav__item"><a onClick={toggleSignUpModal}>Sign Up</a></li>}
                        {user && <li className="head-nav__item"><a onClick={handleLogout}>Logout</a></li>}
                    </ul>

                    {/* {!user && <button className="btn btn-outline-info my-2 my-sm-0" variant="link" onClick={toggleLoginModal}>Login</button>}
                    {!user && <button className="btn btn-outline-info my-2 my-sm-0" variant="link" onClick={toggleSignUpModal}>Sign Up</button>}
                    {user && <button className="btn btn-outline-danger my-2 my-sm-0" variant="link" onClick={handleLogout}>Logout</button>} */}

                    <button className="head-rgt__btn" onClick={gotoCart}>
                        <img
                            src={cartImage}
                            alt="cart image"
                            className="head-cart__btn-img"
                        />
                    </button>

                    {!user && <img src={person} alt="person image" className="head-rgt__img" />}

                    {user && <img src={userImage} alt="person image" className="head-rgt__img" />}

                </div>
            </header>

            <LoginModal show={showLoginModal} onHide={toggleLoginModal} />
            <SignUpModal show={showSignUpModal} onHide={toggleSignUpModal} />

        </div>
    );
};

export default TopNavBar;
