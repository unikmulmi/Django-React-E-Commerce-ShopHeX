import React, { useEffect, useState } from 'react'
import api, { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

const CartItems = ({item , setCartTotal , cartItems , setCartNumberItems , setCartItems}) => {

  const [quantity , setQuantity] = useState(item.quantity)
  const [loading , setLoading] = useState(false)

  function deleteCartItem(){
    const itemID = {item_id:item.id}
    const confirmDelete = window.confirm("Are you Sure you want to Delete this cartItem")

    if(confirmDelete){
      api.post(`delete_cartitem/` , itemID)
      .then(res => {
        console.log(res.data);

        const newCartItems = cartItems.filter(cartitem => cartitem.id !== item.id)
        setCartItems(newCartItems)

        setCartTotal(newCartItems
      .reduce((acc , curr) => acc + curr.total , 0))

        setCartNumberItems(newCartItems
      .reduce((acc , curr) => acc + curr.quantity, 0 ))
      toast.success("CartItem successfully deleted!")
        
      })
      .catch(err => {
        console.log(err.message);
        
      })
    }
  }

  function update_quantity(){
    setLoading(true)
    const itemData = {item_id:item.id ,
                     quantity:quantity}                 
    api.patch(`/update_quantity/` , itemData)
    .then(res => {
      console.log(res.data);

      const updatedCartItems = cartItems.map(((cartitem) => cartitem.id === item.id ? res.data.data : cartitem))
      setCartItems(updatedCartItems)

      setCartTotal (updatedCartItems
        .reduce((acc , curr) => acc + curr.total , 0 )
  );
      setCartNumberItems(updatedCartItems
    .reduce((acc , curr) => acc + curr.quantity , 0)
  );

      setLoading(false)
      toast.success("CartItem updated sucessfully!")

    })
    .catch(err => {
      console.log(err.message);

      
    })
  }

  return (
     <div className="col-md-12">
        {/* Cart Items */}
        
        <div className="cart-item d-flex align-items-center mb-3 p-3"
            style={{backgroundColor: '#f8f9fa', borderRadius: '8px'}}
        >
            <img
                src={`${BASE_URL}${item.product.image}`}
                alt='Product Image'
                className='img-fluid'
                style={{width:'80px',height:'80px',objectFit:'cover',borderRadius:'5px'}}
                />
                <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-0 text-muted">{`$${item.product.price}`}</p>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type='number'
                        min='1'
                        className='form-control me-3'
                        style={{width:'70px'}}
                        value={quantity}
                        onChange={(e) => {
                        const value = Number(e.target.value);
                          if (value < 1) {
                              setQuantity(1);
                        } else {
                              setQuantity(value);
                        }
                      }}
                    />

                    <button className="btn btn-sm mx-2" style={{backgroundColor: "#3B3C65" , color:"white"}} onClick={update_quantity} disabled={loading}>
                        {loading ? "Updating" : "Update"}</button>
                    <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>Remove</button>
                </div>
        </div>

        {/* Add more cart items here */}
    </div>

    
  )
}

export default CartItems