import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import FormContainer from "../components/FormContainer";
import axios from 'axios'


function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const [namedValid, setNamedValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading, error }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()
        let nm = name
        let em = email
        let p = password
        if (nm && em && p) {
            setNamedValid(true)
            setEmailValid(true)
            setPasswordValid(true)

            if (password !== confirmPassword)
                toast.error('Passwords do not match')
            else {
                try {
                    const body = { name, email, password }
                    let resp = await axios.post(`http://localhost:3000/api/user`, body)
                    dispatch(setCredentials({ ...resp.data }))
                    navigate('/')
                } catch (err) {
                    toast(err?.data?.message || err.error, { type: 'error' });
                }
            }
        } else {
            if (nm.trim() === '')
                setNamedValid(false)
            if (em.trim() === '')
                setEmailValid(false)
            if (p.trim() === '')
                setPasswordValid(false)

        }

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
                        onChange={(e) => {
                            setName(e.target.value)
                            setNamedValid(true)
                        }}
                    >
                    </Form.Control>
                    {!namedValid && <p className='text-danger m-1'>Invalid Name</p>}
                </Form.Group>
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
                <Form.Group>
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
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
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