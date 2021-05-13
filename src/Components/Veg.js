import React from 'react'
import { Cartprovider } from './cartcontext'
import VegItems from './VegItems'
import Nav from './nav'

const Product = ()=> {
    return (
    
        <Cartprovider>
            <Nav/>
            <VegItems/>
        </Cartprovider>
      
    )
}
export default Product
