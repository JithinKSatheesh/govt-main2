import React, { useEffect, useState } from 'react'
// import firebase from 'firebase/app';
import firebase from './Firebase'

import {isAuthenticated,authenticate,signOut} from './Auth'
import {Link,Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'





export default function Login(props) {


    return (
        <>
            <div className="container">
                <div>
                    <RenderForm />
                </div>
            </div>
        </>
    )
}


const RenderForm = () => {


    // declare variables to store form data
    const [values, setValues] = useState({
        otp: '',
        mobile: '',
        confirmationResult: '',
        c_error:'',
        redirectToReffer:false,
    })


    // hande form data change and set variable
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }

    const redirectUser = ()=>{
        if(values.redirectToReffer){
            return <Redirect to='/'/>
            
        }
    }
    


    const getOtp = () => {
        let phoneNumber = "+91" + values.mobile
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container')
        
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(function (e) {
            
            setValues({ ...values, confirmationResult: e })
            console.log("OTP is sent");
            
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
            
        });
    }


    const submitOTP = ()=>{

        let code = values.otp
        values.confirmationResult.confirm(code).then((result)=>{
            console.log(result.user,"User")
            authenticate({
                phoneNumber : "+91" + values.mobile
            },()=>{
                setValues({
                    ...values,
                    redirectToReffer:true,
                })
            })

            
        }).catch(err=>{
            console.log("error")
            alert("error or wrong otp")

        })

    }



    return (
        <>

            {
                values.confirmationResult.length === 0 &&

                <div className="row">
                    <div className="col-12 col-md-6 col-lg-5">
                        <h2 className="mb-3">Login</h2>
                        <div className="form" >
                            <div id="recaptcha-container"></div>
                            <div className="small">
                                Just type any phone and login
                            </div>
                            <div>
                                <input
                                    type="text" name="mobile"
                                    placeholder="Mobile Number"
                                    onChange={handleChange('mobile')}
                                    value={values.mobile}
                                    required />
                            </div>
                            <label></label>
                            <Link
                                className='btn btn-success'
                                onClick={()=>{getOtp()}}
                                >Submit</Link>
                        </div>
                    </div>
                </div>

            }
            


            {
                values.confirmationResult.length !== 0 &&
                <div className="row">
                <div className="col-12 col-md-6 col-lg-5">
                    <h2 className="mb-3">Enter OTP</h2>
                    <div className="form" >
                        <div id="recaptcha-container"></div>
                        <div>
                            <input
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="otp"
                                onChange={handleChange('otp')}
                                value={values.otp}
                                required />
                        </div>
                        <div 
                            onClick={()=>{submitOTP()}}
                            className="btn btn-success" 
                            >
                                Submit
                        </div>
                        <div 
                            onClick={()=>{setValues({...values,confirmationResult:''})}}
                            className="btn btn-danger" 
                            >
                                Retry
                        </div>

                    </div>
                </div>
            </div>

            }
            <br /><br />
            <div className="alert alert-warning">
                Fake Auth button -- for testing only &nbsp;
                <br /> Use when phone auth not work &nbsp;
            {
                
                !isAuthenticated().phoneNumber &&
                <div
                    onClick={()=>{
                        authenticate({
                            phoneNumber : "+91989898989"
                        },()=>{
                            setValues({
                                ...values,
                                redirectToReffer:true,
                            })
                        })
                    }}
                    className="btn btn-danger">
                    Login
                </div>
            }
            </div>

            {redirectUser()}

        </>
    )
}






