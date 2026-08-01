import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../coustomer/Navbar/Navbar'

const coustomerLayout = () => {
  return (
    <div>
      <Navbar />
      
      <Outlet />
  
    </div>
  )
}

export default coustomerLayout