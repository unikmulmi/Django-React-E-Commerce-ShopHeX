import { useContext, useState } from "react"
import Error from '../ui/Error'
import api from "../../api"
import { useLocation, useNavigate } from "react-router-dom"
import './LoginPage.css'
import { AuthContext } from "../../context/AuthContext"

const LoginPage = () => {

  const[username , setUsername] = useState("")
  const[password , setPassword] = useState("")
  const[loading  , setLoading] = useState(false)
  const[error , setError] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const {setIsAuthenticated , get_username} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)

    const userInfo = {username:username, password:password}
    api.post(`/token/` , userInfo)
    .then(res => {
      console.log(res.data);
      localStorage.setItem("access" , res.data.access)
      localStorage.setItem("refresh" , res.data.refresh)
      setUsername("")
      setPassword("")
      setError("")
      setIsAuthenticated(true)
      get_username()

      const from = location?.state?.from?.pathname || "/"
      navigate(from , {replace:true})
      
    })
    .catch(error => {
      console.log(error.message);
      setError("Error logging in , Please use correct credentials !")
      
    })
    .finally(() => {
      setLoading(false)
    })
  }


  return (
    <div className="login-container my-5">
      {error && <Error error={error} />}
      <div className="login-card shadow">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} id='username' placeholder='Enter your username' required/>
          </div>
          <div className="mb-3">
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} id='password' placeholder='Enter your password' required/>
          </div>

          <button type='submit' className='btn btn-primary w-100' style={{backgroundColor : '#3B3C65'}} disabled={loading}>Login</button>

        </form>
        <div className="login-footer">
          <p><a href='http://127.0.0.1:8000/admin/core/customuser/2/change/'>Forgot Password?</a></p>
          <p>Don't have an account? <a href='http://127.0.0.1:8000/admin/core/customuser/add/'>Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage