import React from 'react'
import { ProductConsumer } from './Context'
// import Product from './Veg'

export default function Changehomeswitch(props) {
    

    return (
        <>
        <ProductConsumer>
            {values=>{
                return(
                <>
                    <div 
                        onClick={()=>{values.changeHomeScreen('kit')}}
                        className={`kitlink ${values._home_screen === 'kit' ?'bg-success':'bg-light text-dark'}`}    >
                            Kit
                    </div>


                    <div 
                        onClick={()=>{values.changeHomeScreen('veg')}}
                        className={`vegitablelink ${values._home_screen === 'veg' ?'bg-success':''} `}  >
                            Vegitables
                    </div>
                </>
                )
            }}
        </ProductConsumer>
            
        </>
    )
}
