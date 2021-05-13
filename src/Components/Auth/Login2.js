import React, { useEffect, useState } from 'react'
// import firebase from 'firebase/app';
import firebase from './Firebase'

import {isAuthenticated,authenticate,signOut} from './Auth'
import {Link} from 'react-router-dom'


const firebaseConfig = {
    apiKey: "AIzaSyCAXbQ9-j_ah0scqU8h_oea7zn7IN7EgXo",
    authDomain: "authtestotp-20c40.firebaseapp.com",
    projectId: "authtestotp-20c40",
    storageBucket: "authtestotp-20c40.appspot.com",
    messagingSenderId: "406911817001",
    appId: "1:406911817001:web:a52cc222e6d10a07b3d338",
    measurementId: "G-WB3117M2ZN"
}


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
        confirmationResult: ''
    })


    // hande form data change and set variable
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }


    


    const getOtp = () => {

        let phoneNumber = "+91" + values.mobile
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha')
        
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(function (e) {
            let code = prompt("Enter otp")
            setValues({ ...values, confirmationResult: e })
            console.log("OTP is sent");
            e.confirm(code).then((result)=>{
                console.log(result.user,"User")

            }).catch(err=>{
                console.log("error")
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }




    return (
        <>
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
                        <Link
                            
                            className='btn btn-success'
                            
                            // onClick={()=>{authenticate({
                            //     phoneNumber : '0909098989' ,
                            //     address : '',
                            //   },()=>{})
                            // }}
                            type="submit">Submit</Link>
                    </div>
                </div>
            </div>

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
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>

            <div
            onClick={()=>{signOut()}}
            className="btn btn-danger">
                Logout
            </div>

        </>
    )
}






