import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/adminApiSlice";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';


function AdminLoginPage() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading, error }] = useLoginMutation()
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo)
            navigate('/admin')
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ name, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (err) {
            toast(err?.data?.message || err.error, { type: 'error' });
        }
    }
    return (
        <FormContainer>
            <h1>Admin Sign In</h1>
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>
            </Form>
        </FormContainer>
    )
}

export default AdminLoginPage