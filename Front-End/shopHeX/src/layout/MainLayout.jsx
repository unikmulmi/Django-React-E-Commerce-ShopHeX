import React from 'react'
import NavBar from '../components/ui/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({ cartNumberItems }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar cartNumberItems={cartNumberItems} />

      <div className="flex-grow-1">
        <Outlet />
      </div>

      <ToastContainer />
      <Footer />
    </div>
  )
}

export default MainLayout
