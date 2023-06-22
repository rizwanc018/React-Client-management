import React from 'react'
import Hero from '../components/Hero'
import { useSelector } from 'react-redux'
import WelcomeComponent from '../components/WelcomeComponent'


function HomePage() {
  const { userInfo } = useSelector(state => state.auth)

  return (
    <>
      {userInfo ? (<WelcomeComponent />) : (<Hero />)}
    </>
  )
}

export default HomePage