import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
     <footer className = "py-3" style = {{backgroundColor: '#3B3C65' , color: 'white'}}>
    <div className="container text-center">
     {/* Quick Links Section */}
      <div className="mb-2">
        <a href='/' className="text-white text-decoration-none mx-2">Home</a>
        <a href='https://www.facebook.com/profile.php?id=61575251565995&sk=about' className="text-white text-decoration-none mx-2">About</a>
        <a href='/' className="text-white text-decoration-none mx-2">Shop</a>
        <a href='https://www.facebook.com/profile.php?id=61575251565995&sk=about' className="text-white text-decoration-none mx-2">Contact</a>
      </div>

      {/* Social Media Icons Section */}
      <div className="mb-2">
      <a href="https://www.facebook.com" className="text-white mx-2"><FaFacebook/></a>
      <a href="https://twitter.com" className="text-white mx-2"><FaTwitter/></a>
      <a href="https://www.instagram.com" className="text-white mx-2"><FaInstagram/></a>
      </div>
       
       {/* CopyRight Section */}

       <p className='small mb-0'>&copy; 2025 ShopHeX</p>
      </div>

    </footer>
  )
}

export default Footer