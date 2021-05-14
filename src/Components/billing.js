import React, { useState } from 'react'
import { ProductConsumer } from './Context'
import Nav from './nav'
import {Link} from 'react-router-dom'
import { isAuthenticated } from './Auth/Auth'


const Billing = () => {
    return (
        <div>
            <Nav />
            <div className="container">
                <div className="h5">Billing Info</div>
                <ProductConsumer>
                    {values=>{
                        return(
                            <>
                            <RenderForm UpdateAddress={values.UpdateAddress} />
                            </>
                            
                        )
                    }}
                </ProductConsumer>
            </div>
        </div>
    )
}
export default Billing




const RenderForm = ({UpdateAddress}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: isAuthenticated().phoneNumber,
        address: '',
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }


    return (
        <>
            <div className="form">
                <div className="form-group">
                    <input
                        className={'form-control'}
                        onChange={handleChange('name')}
                        value={values.name}
                        placeholder="name"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        className={'form-control'}
                        onChange={handleChange('email')}
                        value={values.email}
                        placeholder="email"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        className={'form-control'}
                        onChange={handleChange('phone')}
                        value={values.phone}
                        placeholder="phone"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        className={'form-control'}
                        onChange={handleChange('address')}
                        value={values.address}
                        placeholder="Address"
                        type="text"
                    />
                </div>
                <Link
                    to='cart'
                    onClick={()=>{UpdateAddress(values)}}
                    className="btn btn-danger">
                    Submit
                </Link>
            </div>
        </>
    )
}