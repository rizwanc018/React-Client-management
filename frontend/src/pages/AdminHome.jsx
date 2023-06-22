import React, { useEffect, useState } from 'react'
import { useDeleteMutation, useHomeQuery, useSearchUserQuery } from '../slices/adminApiSlice'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setId } from '../slices/adminSlice';
import axios from 'axios'


function AdminHome() {
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { data, error, isLoading, refetch } = useHomeQuery()
    const [deleteUser, response] = useDeleteMutation()



    const goToCreateUser = () => navigate('/admin/user')
    const handleEditClick = (id) => {
        navigate('/admin/user/edit')
        dispatch(setId(id))
    }

    const useSearchUserQuery = async () => {
        let searchResult = await axios.get(`http://localhost:3000/api/admin/user?q=${search}`).then(resp => {
            setClients(resp.data);
        })
    }

    useEffect(() => {
        setClients(data)
    },[data])

    return (
        <>
            <h1>All Users</h1>
            <Container>
                <Row>
                    <div>
                        <input type="text" className='me-3' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <Button className='btn btn-info' onClick={useSearchUserQuery}>Search</Button>
                    </div>
                    <Button onClick={goToCreateUser} className='col-auto ms-auto btn btn-success'>Create User</Button>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients && clients.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val._id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>
                                        <Button className='me-3 btn btn-danger'
                                            onClick={() => {
                                                deleteUser(val._id)
                                                refetch()
                                            }}
                                        >Del</Button>
                                        <Button
                                            onClick={() => handleEditClick(val._id)}
                                        >Edit</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}

export default AdminHome