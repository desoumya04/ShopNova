import React from 'react'
import {Outlet} from 'react-router-dom'
import SellerNavbar from '../seller/Navbar'

const sellerLayout = () => {
  return (
    <div>
      <SellerNavbar />
      <Outlet />
    </div>
  )
}

export default sellerLayout