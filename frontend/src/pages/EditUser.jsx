import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import axios from "axios";
import { useEditUserMutation, useGetUserQuery } from "../slices/adminApiSlice";


function EditUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector(state => state.id.value)
    const { data, error, isLoading, refetch } = useGetUserQuery(id)
    const [editUser, result] = useEditUserMutation()


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            navigate('/admin')
            await editUser({ id, name, email }).unwrap()
        } catch (err) {
            toast(err?.data?.message || err.error, { type: 'error' });
        }
    }

    useEffect(() => {
        setName(data?.res.name)
        setEmail(data?.res.email)
    }, [id, data]);

    return (
        <>
            <FormContainer>
                <h1>Edit Client</h1>

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

                    <Button type="submit" variant="primary" className="mt-3">
                        Update
                    </Button>
                </Form>

            </FormContainer>
        </>

    )
}

export default EditUser