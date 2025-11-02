import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'


const NavBarLink = () => {

    const {isAuthenticated , setIsAuthenticated , username} = useContext(AuthContext)


    function logout(){
      localStorage.removeItem("access")
      setIsAuthenticated(false)
    }
  return (
    
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {isAuthenticated ? <>
              <li className='nav-item'>
            <NavLink
            to="/profile"
            className={({isActive}) => 
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
            end
            >
                {`Hi , ${username}`}
            </NavLink>

        </li>

        <li className='nav-item' onClick={logout}>
            <NavLink
            to="/"
            className={({isActive}) => 
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
            end
            >
                Logout
            </NavLink>

        </li>

      </> : <>
      
              <li className='nav-item'>
            <NavLink
            to = '/login'
            className={({isActive}) => 
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
            end 
            >
                Login
            </NavLink>
        </li>
        <li className='nav-item'>
            <NavLink
            to="http://127.0.0.1:8000/admin/core/customuser/add/"
            className={({isActive}) => 
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
            end
            >
                Register
            </NavLink>

        </li>
      </> }


    </ul>
 
  )
}

export default NavBarLink