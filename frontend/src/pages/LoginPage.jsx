import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';


function LoginPage() {
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(true)

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(true)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading, error }] = useLoginMutation()
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo)
            navigate('/')
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let e = email
            let p = password
            if (e && p) {
                setEmailValid(true)
                setPasswordValid(true)
                const res = await login({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } else {
                if (e.trim() === '')
                    setEmailValid(false)
                if (p.trim() === '')
                    setPasswordValid(false)

            }
        } catch (err) {
            toast(err?.data?.message || err.error, { type: 'error' });
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailValid(true)
                        }}
                    >
                    </Form.Control>
                    {!emailValid && <p className='text-danger m-1'>Invalid Email</p>}
                </Form.Group>
                <Form.Group className='mt-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordValid(true)
                        }}
                    >
                    </Form.Control>
                    {!passwordValid && <p className='text-danger m-1'>Invalid Password</p>}
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={`/register`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage