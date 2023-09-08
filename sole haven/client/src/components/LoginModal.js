import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginModal = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Login Logic Here
        console.log('Logging in with:', email, password);

        const userInfo = {
            email: email,
            password: password
        }

        const eemail = email;

        try {
            const url = 'http://localhost:5000/api/auth/';
            axios.post(url, userInfo)
                .then((res) => {

                    localStorage.setItem("token", res.data.data);

                    const url2 = 'http://localhost:5000/api/user/' + eemail;
                    axios.get(url2)
                        .then((res) => {
                            if (res.data.isAdmin) {
                                localStorage.setItem("isAdmin", res.data.isAdmin);
                            }
                            localStorage.setItem("profileImage", res.data.profileImage);
                            localStorage.setItem("userEmail", res.data.email);
                            window.location = "/";
                        })
                        .catch((err) => {
                            console.log(err);
                            setError(err);
                        });

                    // const admin = localStorage.getItem("isAdmin");
                    // console.log(admin);

                    // Close the modal
                    props.onHide();

                    navigate("/");

                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                });

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }

        // window.location = '/';

    };

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <h1>Login to your Account</h1>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <div>{error}</div>}
                    {/* <Button type="submit" variant="primary">
                        Login
                    </Button> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
