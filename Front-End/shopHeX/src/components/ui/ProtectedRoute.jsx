import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import api from '../../api'
import { Navigate, useLocation } from 'react-router-dom'
import Spinner from './Spinner'

const ProtectedRoute = ({children}) => {

  const [isAuthorized , setIsAuthorized] = useState(null)
  const location = useLocation()

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  } , [])

  async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh")

    try{
      const res = await api.post(`/token/refresh/` , {
        refresh:refreshToken
      })
      if(res.status === 200){
          localStorage.setItem("access" , res.data.access)
          setIsAuthorized(true)
      }
      else{
        setIsAuthorized(false)
      }
    }
    catch(error){
      console.log(error.message);
      setIsAuthorized(false)
      
    }
    
  }

  async function auth() {
    const token = localStorage.getItem("access")
    if(!token){
      setIsAuthorized(false)
      return;
    }
    const decoded = jwtDecode(token)
    const expiry_time = decoded.exp
    const current_time = Date.now() / 1000
    if(current_time >= expiry_time){
      await refreshToken()
    }
    else{
      setIsAuthorized(true)
    }
    
  }

  if(isAuthorized === null){
    return <Spinner />
  }

  return (
    <div>
      {isAuthorized ? children : <Navigate to = '/login' state={{from : location}} replace/>}
    </div>
  )
}

export default ProtectedRoute