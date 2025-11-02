import React, { useEffect, useState } from 'react'
import api from '../../api'
import CartItems from './CartItems'
import CartSummary from './CartSummary'
import Spinner from '../ui/Spinner'
import UseCartData from '../../hooks/UseCartData'

const CartPage = ({setCartNumberItems}) => {

    const {cartItems , setCartItems , cartTotal , setCartTotal , loading , tax} = UseCartData()

    if(loading){
        return <Spinner />
    }

    if(cartItems.length < 1){
        return (<div className="alert alert-primary my-5" role="alert">
                You haven't added any item to Your Cart Yet!
                </div>)
    }


  return (
       <div className="container my-3 py-3" style={{height:'80vh',overflow:'scroll'}}>
        <h5 className="mb-4">Shopping Cart</h5>
        <div className="row">
            <div className="col-md-8">
                {cartItems.map(item => <CartItems key={item.id}
                                                item={item}
                                                setCartTotal={setCartTotal}
                                                cartItems={cartItems}
                                                setCartNumberItems={setCartNumberItems}
                                                setCartItems={setCartItems}/>)}


            </div>
            <CartSummary cartTotal={cartTotal} tax={tax}/>
        </div>
        
    </div>

  )
}

export default CartPage