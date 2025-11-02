import React from 'react'
import UseCartData from '../../hooks/UseCartData'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'

const CheckoutPage = () => {

    const {cartItems ,  cartTotal , tax , loading , setCartItems , setCartTotal , setLoading} = UseCartData()
    
  return (
       <div className="container my-4">
        <div className="row">
            <OrderSummary cartItems={cartItems} cartTotal={cartTotal} tax={tax}/>
            <PaymentSection />
        </div>
    </div>
  )
}

export default CheckoutPage