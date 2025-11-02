import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link, useLocation } from 'react-router-dom'

const PaymentStatusPage = ({setCartNumberItems}) => {

  const [statusMessage , setStatusMessage] = useState("Verifying your Payment")
  const [statusSubMessage , setStatusSubMessage] = useState("Wait a moment , Your payment is being verified")
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const paymentid = queryParams.get("paymentId")
    const payid = queryParams.get("PayerID")
    const ref = queryParams.get("ref")

    if (paymentid && payid && ref){
      api.get(`/paypal_payment_callback/?paymentId=${paymentid}&PayerID=${payid}&ref=${ref}`)
      .then(res => {
        console.log(res.data);

        setStatusMessage(res.data.message)
        setStatusSubMessage(res.data.subMessage)
        localStorage.removeItem("cart_code")
        setCartNumberItems(0)
        
      })
      .catch(err => {
        console.log(err.message);
        
      })
    }
    
  } , [])

  return (
        <header className="py-5" style={{backgroundColor: "#3B3C65"}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h2 className="display-4 fw-bold">{statusMessage}</h2>
                <p className="lead fw-normal text-white-75 mb-4">{statusSubMessage}</p>
                <span>
                    <Link to="/profile" className="btn btn-light btn-lg px-4 py-2 mx-3">View Order Details</Link>
                    <Link to="/" className="btn btn-light btn-lg px-4 py-2">Continue Shopping</Link>
                </span>
            </div>
        </div>
    </header>
  )
}

export default PaymentStatusPage