import React from 'react';
// import bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import shoe from "../assets/img/landing_welcome_shoe.png";

const WelcomeSection = () => {
    return (
        <div className='welcome-container' id='about'>
            {/* //   < !--About Us Section-- > */}
            <div className="green-line"></div>
                <div className="green-shoe">
                    <img src={shoe} alt="welcome-shoe" />
                </div>
                <div className="green-welcome">
                    <div className="welcome-title">ABOUT US</div>
                    <br />
                    <div className="welcome-body">
                        Sole Haven was founded in 2017.
                        <br /> We are a premium shoe retailer.
                        <br /> We bring you the best and the newest. Our main goals are to
                        <br />Innovate the sneaker game and create employment in the process.
                        <br />
                        <br />We are a shoe retailer created for
                        <br />the youth & the young at heart by the youth!
                    </div>
                    <div className="welcome-underline"></div>
                </div>
            {/* <!--About Us Section--> */}
        </div>
    );
};

export default WelcomeSection;
