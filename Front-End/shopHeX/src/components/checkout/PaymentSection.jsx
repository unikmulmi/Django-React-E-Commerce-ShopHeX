import React from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'

const PaymentSection = () => {

    const cart_code = localStorage.getItem("cart_code")

    function paypalPayment(){
        api.post(`/initiate_payment/` , {cart_code})
        .then(res => {
            console.log(res.data);
            //window.location.href = res.data.data.link
            if(res.data.approval_url){
                window.location.href = res.data.approval_url
            }
            
        })
        .catch(err => {
            console.log('Error initiating payment:' , err.message);
            
        })
    }

  return (
        <div className="col-md-4 my-4">
        <div className={`card ${styles.card}`}>
            <div className="card-header" style={{backgroundColor: '#3B3C65' , color:"white"}}>
                <h5>Payment Options</h5>
            </div>
            <div className="card-body">
                {/* PayPal Button */}
                <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id='paypal-button' onClick={paypalPayment}>
                    <i className="bi bi-paypal"></i>Pay with PayPal
                </button>
                {/* Flutterwave Button */}
                <button className={`button btn btn-warning w-100 ${styles.flutterwaveButton}`} id='flutterwave-button'>
                    <a href='/' style={{ textDecoration: 'none', color: 'inherit' }}><i className="bi bi-credit-card"></i>Continue Shopping</a>
                    
                </button>

            </div>
        </div>
    </div>
  )
}

export default PaymentSection