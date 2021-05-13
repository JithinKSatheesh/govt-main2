import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Nav from './nav'
import './nav.css'

import {ProductConsumer} from './Context'
import Changehomeswitch from './ChangeHomeSwitch'


const VegItems = () => {


    return (
        <div>

            {/* content */}

            <Changehomeswitch/>
            <div className="whiteclr"></div>
            <div className="hidn">

            </div>

            {/* accessing common values and data from context.js */}

            <ProductConsumer>
                {(values)=>{
                    return(
                        <>
                            <div className="row p-3 m-2 mt-3">
                                {console.log(values)}
                                {
                                // mapping all products 
                                values.products_veg.map((product) => (
                                    <RenderProductCard product={product} AddToCart={values.AddToCart} />
                                ))
                                
                                }
                            </div>
                        </>
                    )
                }}
            </ProductConsumer>


        </div>
    )
}
export default VegItems


const RenderProductCard = ({product,AddToCart}) => {

    const [quantity,setQuantity] = useState('1')

    return (
        <>
            <div key={product.id} className="col-12 col-md-6 col-lg-3 p-2 card">
                <img src={product.image} />
                <h1>{product.name}</h1>
                <h3>RS {product.price}</h3>
                <div className="h6">Quantity</div>
                <select
                    onChange={(e) => { setQuantity(e.target.value) }}
                    value={quantity}
                    name="" id="">
                    <option value="1">1 kg</option>
                    <option value="2">2 kg</option>
                    <option value="3">3 kg</option>
                </select>
                <div
                    onClick={() => { 
                        AddToCart(
                        {
                            id      :   product.id,
                            name    :   product.name,
                            price   :   product.price,
                            image   :   product.image,
                            quantity:   quantity,
                        }) 
                    }}
                    className='btn btn-light'>Add to cart</div>
            </div>

        </>
    )
}