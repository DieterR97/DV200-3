import React from 'react';
import '../css/header.css';
import cart from '../assets/img/icon-cart.svg';
import menu from '../assets/img/icon-menu.svg';
import logo from '../assets/img/logo.svg';
// import person from '../assets/img/image-avatar.png';
import person from '../assets/img/image-avatar.jpg';


const Header = () => {
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
                    <img src={logo} alt="logo" className="head-logo logo-size" />
                    <ul className="head-nav">
                        <li className="head-nav__item">Collections</li>
                        <li className="head-nav__item">Men</li>
                        <li className="head-nav__item">Women</li>
                        <li className="head-nav__item">About</li>
                        <li className="head-nav__item">Contact</li>
                    </ul>
                </div>

                <div className="head-rgt">
                    <button className="head-rgt__btn">
                        <img
                            src={cart}
                            alt="cart image"
                            className="head-cart__btn-img"
                        />
                    </button>

                    <img
                        src={person}
                        alt="person image"
                        className="head-rgt__img"
                    />
                </div>
            </header>

        </div>
    );
};

export default Header;
