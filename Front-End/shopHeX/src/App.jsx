import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './components/home/HomePage'
import NotFoundPage from './components/ui/NotFoundPage'
import ProductPage from './product/ProductPage'
import api from './api'
import CartPage from './components/cart/CartPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import LoginPage from './components/user/LoginPage'
import { AuthProvider } from './context/AuthContext'
import UserProfilePage from './components/user/UserProfilePage'
import PaymentStatusPage from './components/payment/PaymentStatusPage'


const App = () => {

  const cart_code = localStorage.getItem("cart_code")
  const [cartNumberItems , setCartNumberItems] = useState(0)
  
  useEffect(() => {
    if(cart_code & cart_code !== "null"){
    api.get(`get_cart_number_counter?cart_code=${cart_code}`)
    .then(res => {
      console.log(res.data);
      setCartNumberItems(res.data.cart_number_counter)
    })
    .catch(err => {
      console.log(err.message);
      
    })
  }
  }, [cart_code])

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout cartNumberItems={cartNumberItems}/>}>
      <Route index element={<HomePage />}/>
      <Route path='product_detail/:slug/' element={<ProductPage setCartNumberItems={setCartNumberItems}/>} />
      <Route path='cart' element={<CartPage  setCartNumberItems={setCartNumberItems}/>}/>
      <Route path='checkout' element={<ProtectedRoute>
              <CheckoutPage />
                                      </ProtectedRoute> }/>
      <Route path='login' element={<LoginPage />} />
      <Route path='profile' element={<UserProfilePage />}/>
      <Route path='payment-status' element={<PaymentStatusPage setCartNumberItems={setCartNumberItems}/>} />
      <Route path='*' element={<NotFoundPage />} />

      </Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App