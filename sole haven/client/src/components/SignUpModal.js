import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import axios from "axios";

const SignUpModal = ({ show, onHide }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Sign-up logic here
        console.log('Signing up with:', email, password, name, surname, profileImage);

        const userInfo = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            profileImage: profileImage,
            isAdmin: false
        }

        try {
            const url = 'http://localhost:5000/api/registerUser/';
            const { userInfo: res } = await axios.post(url, userInfo);

            // Close the modal
            onHide();

            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }

    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="surname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter surname"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="profileImage">
                        <Form.Label>Profile Image Url</Form.Label>
                        <Form.Control
                            type="profileImage"
                            placeholder="profileImage"
                            name="profileImage"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <div>{error}</div>}
                    {/* <Button type="submit" variant="primary">
                        Sing Up
                    </Button> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SignUpModal;
