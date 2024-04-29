import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link   } from 'react-router-dom';
import { useSelector   } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/commons.css";

import {PAYPAL_CLIENTID, DOMAIN} from '../util/config'
import {formartToSQLDatetime} from '../util/formatDate'

const initialOptions = {
    clientId: PAYPAL_CLIENTID,
    currency: "USD",
    intent: "capture",
};

function Checkout() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const membership = searchParams.get('membership');
    const type = searchParams.get('type');
    const price = parseFloat(searchParams.get('price'));

    const {user_login} = useSelector(state => state.UserReducer)

    const [result, setResult] = useState({});

    const createOrder = (data) => {
        return fetch(`${DOMAIN}/user/create-paypal-order`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price: price
            })
        })
        .then((response) => response.json())
        .then((order) => order.id);
    }
    const onApprove = (data) => {
        return fetch(`${DOMAIN}/user/capture-paypal-order`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: data.orderID,
                subscription: {
                    price: price,
                    id_membership: membership,
                    id_user: user_login.id_user,
                    status: 1,
                    start_time: formartToSQLDatetime(new Date()),
                    end_time: formartToSQLDatetime(new Date())
                }
            })
        })
        .then((response) => response.json())
    }

    return (
        <div className="checkout-page container d-flex align-items-center flex-column">
            <div className='container my-5'>
                <p className='subtitle1 text-center text-scheme-primary'>PRICING</p>
                <h4 className="text-center">Checkout</h4>
            </div>
            <div className="d-flex justify-content-evenly row col-12">
            <div className="checkout-info-section d-flex col-4 flex-column"> 
                    <h6 className="text-scheme-primary mb-3">Subscription information</h6>
                    {/* <p className="p1 d-flex justify-content-between mb-2">
                        <span className="button1 text-scheme-main-text mt-1">Order ID </span>
                        <span>xxxxxxxx</span>
                    </p> */}
                    <p className="p1 d-flex justify-content-between mb-2">
                        <span className="button1 text-scheme-main-text mt-1">Payment</span>
                        <span>xxxxxxxx</span>
                    </p>
                    <p className="p1 d-flex justify-content-between mb-2">
                        <span className="button1 text-scheme-main-text mt-1"> Start date </span>
                        <span>xxxxxxxx</span>
                    </p>
                    <p className="p1 d-flex justify-content-between mb-2">
                    <span className="button1 text-scheme-main-text mt-1"> Expired date </span> 
                        <span>xxxxxxxx</span>
                    </p>
                    <h6 className="text-scheme-primary mt-4 mb-3">User information</h6>
                    <div className="form-group">
                        <label className="label2">Full name</label>
                        <input type="text" name="fullname"/>
                    </div>
                    <div className="form-group mb-4">
                        <label className="label2">Email address</label>
                        <input type="email" name="email"/>
                    </div>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons 
                            style={{ layout: "horizontal" }}
                            createOrder={(data,actions) => createOrder(data,actions)}
                            onApprove={(data,actions) => onApprove(data,actions)} />
                    </PayPalScriptProvider>
                    <Link to="/pricing" className="button2 bg-white text-neutral-700 mt-2">
                        <i className="text-neutral-700 fa-solid fa-arrow-left me-2"></i>Back to Pricing
                    </Link>
                </div>
                <div className="membership-section bg-black col-4">
                    abc
                </div>
                
            </div>
            

        </div>
    )
}
export default Checkout;