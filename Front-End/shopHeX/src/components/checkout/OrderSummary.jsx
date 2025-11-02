import OrderItem from './OrderItem'
import styles from './OrderSummary.module.css'

const OrderSummary = ({cartItems , cartTotal , tax}) => {

    const total = (cartTotal+ tax).toFixed(2)

  return (
        <div className="col-md-8 my-4">
        <div className={`card mb-4 ${styles.card} `}>
            <div className="card-header" style={{backgroundColor : '#3B3C65' , color:"white"}}>
            <h5>Cart Summary</h5>
            </div>
            <div className="card-body">
                <div className="px-3" style={{height:"300px" , overflow:"auto"}}>
                    {cartItems.map(cartitem => <OrderItem key={cartitem.id}
                                                          cartitem={cartitem}/>)}

                {/* <OrderItem /> */}
                    


                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <h6>Total</h6>
                    <h6>{total}</h6>
                </div>
            </div>
        </div>
    </div>
  
  )
}

export default OrderSummary