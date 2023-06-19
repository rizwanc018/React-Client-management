import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

import React from 'react'
import { set } from "mongoose";

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setconfirmPassword] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted');
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={`/login`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage