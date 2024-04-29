import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation   } from 'react-router-dom';
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
            <div className='container-fluid'>
                <div className='container' style={{padding: '72px 0'}}>
                    <p className='subtitle1' style={{color: 'var(--scheme-primary)',
    textAlign: 'center'}}>ABOUT US</p>
                    <h4 style={{textAlign: 'center'}}>About the company</h4>
                    <p className='p1 subtext'>Learn more about the company and the team behind it.</p>
                </div>
            </div>
            <div className="checkout-info-section bg-blue my-5 h-50 w-50">
                <p className="title1">
                    Payment information
                </p>
                <p className="title2">
                    Membership information
                </p>
                <p className="">
                    ${price}
                </p>
                <p className="">
                    Type: {type} membership
                </p>
                <p className="title2">
                    User information
                </p>

                <p className="">
                    Time: hh:mm:ss dd-mm-yyyy
                </p>
            </div>
            <div className="checkout-section w-50">
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons 
                        style={{ layout: "horizontal" }}
                        createOrder={(data,actions) => createOrder(data,actions)}
                        onApprove={(data,actions) => onApprove(data,actions)} />
                </PayPalScriptProvider>
            </div>

        </div>
    )
}
export default Checkout;