import React, { useEffect, useState } from 'react'
import ProductPagePlaceholder from './ProductPagePlaceholder'
import RelatedProducts from './RelatedProducts'
import api, { BASE_URL } from '../../api'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductPage = ({setCartNumberItems}) => {
    
    const {slug} = useParams()
    const [product , setProduct] = useState({})
    const [loading , setLoading] = useState(false)
    const [similarProducts , setSimilarProducts] = useState([])
    const cart_code = localStorage.getItem("cart_code")
    const [inCart  , setInCart] = useState(false)

    useEffect(() => {
        if(product.id){
        api.get(`product_in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res => {
            console.log(res.data);
            setInCart(res.data.product_in_cart)
        })
        .catch(err => {
            console.log(err.message);
            
        })
    }
    } , [cart_code , product.id])

    function add_item(){
        const newItem = {cart_code: cart_code , product_id : product.id}
        api.post(`add_item/` , newItem)
        .then(res => {
            console.log(res.data);
            setInCart(true)
            setCartNumberItems(counter => counter + 1)
            toast.success("Product added to Cart!")
            
        })
        .catch(err => {
            console.log(err.message);
            
        })
    }

    useEffect(() => {
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data);
            setLoading(false)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false)
        })

    } , [slug])

    if(loading){
        return <ProductPagePlaceholder />
    }

   
  return (
    <div>
        <section className="py-3">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img
                        className='card-img-top mb-5 mb-md-0'
                        src= {`${BASE_URL}${product.image}`}
                        alt='...'
                       /> 
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bolder mb-3">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span> {`$${product.price}`}</span>
                        </div>
                        <p className='lead'>
                            {product.description}
                        </p>
                        <div className="d-flex gap-2">
                            <button
                            className='btn btn-outline-dark flex-shrink-0'
                            type='button'
                            onClick={add_item}
                            disabled={loading || inCart}
                            >
                                <i className="bi-cart-fill me-1"></i>
                                    {inCart ? "Product Added to Cart" : "Add to cart"}
                                
                            </button>
                        <Link to = "/cart" >
                            <button
                            
                            className='btn btn-outline-dark flex-shrink-0'
                            type='button'
                            >
                                View Cart  
                            </button>
                            </Link> 
                        </div>

                    </div>
                </div>
            </div>
        </section>


         <RelatedProducts similarProducts={similarProducts}/>
    </div>
    
  )
}

export default ProductPage