import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainer from './OrderHistoryItemContainer.jsx'
import api from '../../api.js'
import Spinner from '../ui/Spinner.jsx'


const UserProfilePage = () => {

    const [userInfo , setUserInfo] = useState({})
    const [loading , setLoading] = useState(false)
    const [orderItems , setOrderItems] = useState([])

    useEffect(() => {
        setLoading(true)
        api.get(`/get_userInfo/`)
        .then(res => {
            console.log(res.data);
            setUserInfo(res.data)
            setLoading(false)
            setOrderItems(res.data.items)
            
        })
        .catch(err => {
            console.log(err.message);
            
        })
    } , [])

    if(loading){
        return <Spinner />
    }

  return (
        <div className="container my-5">
        {/* Profile Header*/}
        <UserInfo userInfo={userInfo}/>

        {/* Order History*/}
        <OrderHistoryItemContainer orderItems={orderItems}/>

    </div>
  )
}

export default UserProfilePage