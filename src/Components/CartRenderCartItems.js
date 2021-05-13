import React, { useState } from 'react'
import {ProductConsumer} from './Context'



export default function  RenderCartItems(){

    return(
        <>
        <div className="h3">
            Cart
        </div>
        <div className="card p-2">
            <div className="h5 mt-2 mb-2">
                Order Summary
            </div>
            <ProductConsumer>
                        {(values)=>{

                            let subtotal = values.cart.map(item => parseInt(item.quantity) * parseInt(item.price)).reduce((prev, next) => prev + next,0)                                
                            
                            return(
                                <>
                                <div>
                                {console.log("from cart",values)}
                                
                                {values.cart.length === 0 && <div className='text-center'>Cart is empty</div>}  
                                <div className="p-2">
                                    {
                                        values.cart.map((item)=>{
                                            return(
                                                <div className="card text-secondary">
                                                    <img style={{width:'150px'}} src={item.image} alt="" />
                                                    <div className="h6">
                                                        {item.name}
                                                    </div>
                                                    <div className="h6">
                                                       Prce : {item.price}/unit
                                                    </div>
                                                    <div className="h6">
                                                       Quantity : {item.quantity}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }          
                                </div> 

                                <div className="card">
                                    <div className="h4">Subtotal</div>
                                    {
                                       "Rs " +  subtotal
                                    }
                                </div>

                                </div>
                                </>
                            )
                        }}
            </ProductConsumer>
        </div>
        </>
    )
}