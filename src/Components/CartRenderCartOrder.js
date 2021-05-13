import React, { useState } from 'react'
import {ProductConsumer} from './Context'
import {Link} from 'react-router-dom'

export default function Rendercartorder(props) {
    

    return (
        <>
            <div className="h5">
                Complete Order
            </div>  
            <ProductConsumer>
                {(values)=>{
                    return(
                        <>
                        <div className="card p-3">
                            <div className="h6">
                                select address
                            </div>
                            {
                                values.user_address.length === 0  ?
                                <>
                                    <div className="text-danger small">
                                        No address specified
                                    </div>
                                    <Link  to='/billing' className="btn btn-link">
                                        Set billing address
                                    </Link>
                                    <br />
                                </>
                                :
                                <>
                                <div className="card m-2">

                                    <div className="p-1">
                                    name  {values.user_address[0].name}
                                    </div>
                                    <div className="p-1">
                                    emial  {values.user_address[0].email}
                                    </div>
                                    <div className="p-1">
                                    phone  {values.user_address[0].phone}
                                    </div>
                                    <div className="p-1">
                                    Address  {values.user_address[0].address}
                                    </div>
                                                              
                                </div>
                                </>
                            }
                            {
                            values.user_address.length === 0 ?
                            <button type="button" className="btn btn-secondary" disabled>
                                Complete order
                            </button>
                            :
                            <div 
                                onClick={()=>{values.CheckOut()}}
                                type="button" className="btn btn-success">
                                Complete order
                            </div>
                            }
                        </div>
                        </>
                    )
                }}
            </ProductConsumer>
            

        </>
    )
}
