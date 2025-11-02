import React, { useEffect, useState } from 'react'
import Header from './Header'
import CardContainer from './CardContainer'
import api from '../../api'
import PlaceHolderContainer from '../ui/PlaceHolderContainer'
import { randomValue } from '../../generateCartCode'
import Error from '../ui/Error'

const HomePage = () => {

    const [product , setProduct] = useState([])
    const [loading  , setLoading] = useState(false)
    const [error , setError] = useState("")

    useEffect(() => {
        if(localStorage.getItem("cart_code") === null){
            localStorage.setItem("cart_code" , randomValue)
        }
    } , [])

    useEffect(() => {
        setLoading(true)
        api.get(`/products/`)
        .then(res => {
            console.log(res.data);
            setProduct(res.data)
            setLoading(false)
            setError("")
            
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false)
            setError("Something went Wrong While Fetching the Products  , Please Try again !")
            
        })
    } , [])

  return (
    <> 
    <Header />
    {loading && <PlaceHolderContainer />}
    {error && <Error error={error}/>}
    {!loading && !error && <CardContainer products={product}/>}
    
    </>
  
  )
}

export default HomePage