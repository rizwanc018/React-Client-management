import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'


function App() {
  const { userInfo } = useSelector(state => state.auth)

  return (
    <>
    {userInfo?.isAdmin ? (<AdminHeader />) : (<Header /> ) }
      {/* <Header /> */}
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  )
}

export default App