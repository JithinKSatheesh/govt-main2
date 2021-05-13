import React,{useEffect, useState} from 'react'
import {authenticate, isAuthenticated} from './Auth/Auth'
// importing data
import fakedata from './fakedata'


const ProductContext = React.createContext()


function  ProductProvider(props) {
    
    // declaring all variables common for the project
    const [values,setValues] = useState({
        cart : [],
        products_veg: [],
        _home_screen : 'kit', // kit or veg
        kit_screen : '200',      //200 or 400
        user_address : [],

    })


    useEffect(()=>{
        // call function to initialize data to product kit
        initKitProducts()
    },[])

    const changeHomeScreen=(input)=>{
        setValues({
            ...values,
            _home_screen : input
        })
    }
    const changeKitScreen=(input)=>{
        setValues({
            ...values,
            kit_screen : input
        })
    }

    const UpdateAddress = (address)=>{
        setValues({
            ...values,
            user_address: [address],
        })
    }

    const initUserAddress =()=>{
        
    }


    const initKitProducts = ()=>{
        // write a function to fetch data from database 
        fetch('https://api.npms.io/v2/search?q=react')
        .then(res =>{
            // if success
            if(res.status === 200)
            {
                setValues({
                    ...values,
                    products_veg : res.data.products, // match it from backend
                    cart : res.data.cart, // match it from backend
                })
            }
        }).catch(err=>{
            // setting dummy data
            // delete this on production
            setValues({
                ...values,
                products_veg : fakedata.products 
            })
        })
        
    }


    
    const AddToCart = (item) =>{

        // const item = values.products_veg.find((x) => x.id === id);
        // item.quantity = parseInt(quantity)
        console.log(item)

        // inset to cart --- backend

        if(item){
            console.log(" calling")
            fetch('https://example.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            .then(res => {
                console.log(res)
                // if success--> set values to cart
                if(res.status === 200){
                    setValues({
                        ...values,
                        cart : [...values.cart, item]
                    })
                } 
            })
            .catch(err=>{
                // on error also adding data to cart for testing
                // remove this on production
                setValues({
                    ...values,
                    cart : [...values.cart, item]
                })
            })
        }
        

        
        console.log("values added to cart",item , values)
        
    }


    const CheckOut = () =>{

        console.log("cheking out")
        alert("checking out..",values.cart)

        const data = {
            cart : values.cart,
            billing_address : values.user_address
        }

        fetch('https://example.com/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        }).then(res=>{
            // if success 

        }).catch(err=>{
            // show error
        })


    }

  

    return (
        <ProductContext.Provider value={{
            ...values,
            AddToCart:AddToCart,
            CheckOut:CheckOut,
            changeHomeScreen:changeHomeScreen,
            changeKitScreen:changeKitScreen,
            UpdateAddress:UpdateAddress,
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

const ProductConsumer = ProductContext.Consumer;
export {ProductConsumer,ProductProvider}