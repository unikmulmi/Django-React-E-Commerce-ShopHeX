import { FaCartShopping } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import NavBarLink from "./NavBarLink";

const NavBar = ({cartNumberItems}) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
    <div className='container'>
      <Link  to ="/" className = "navbar-brand fw-bold " >ShopHeX</Link>
      <button
      className='navbar-toggler'
      type='button'
      data-bs-toggle = "collapse"
      data-bs-target = "#navbarContent"
      >
        <span className='navbar-toggler-icon'></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
        <NavBarLink />
        <Link to = "/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
        <FaCartShopping />
        {cartNumberItems == 0 || <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill'style={{fontSize:'0.85rem',padding:'0.5em 0.65em',backgroundColor:'#3B3C65'}}
        >
        {cartNumberItems}

        </span> }

        
        
        </Link>

        </div>
      </div>
    </nav>
  )
}

export default NavBar