import React, { useState } from 'react'
import Nav from './nav'
import RenderCartItems from './CartRenderCartItems'
import Rendercartorder from './CartRenderCartOrder'

import {ProductConsumer} from './Context'

const Cart=(props)=> {

    // const {cart}=props
    


    return (
        <div>
            <Nav/>

            <div  className="container" >
                {/* accessing variables from context.js */}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <RenderCartItems/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Rendercartorder/>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Cart


