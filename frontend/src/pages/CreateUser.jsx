import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useAddUserMutation } from "../slices/adminApiSlice";


function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addUser, { isLoading, error }] = useAddUserMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword)
            toast.error('Passwords do not match')
        else {
            try {

            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <>
            <FormContainer>
                <h1>Create User</h1>
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
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    {isLoading && <Loader />}

                    <Button type="submit" variant="primary" className="mt-3">
                        Create
                    </Button>
                </Form>

            </FormContainer>
        </>

    )
}

export default CreateUser