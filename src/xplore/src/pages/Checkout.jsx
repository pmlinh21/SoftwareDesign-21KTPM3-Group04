import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "../styles/commons.css";
import "./About.css";
import {PAYPAL_CLIENTID, DOMAIN} from '../util/config'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    clientId: PAYPAL_CLIENTID,
    currency: "USD",
    intent: "capture",
};

function Checkout() {
    const createOrder = (data) => {
        return fetch(`${DOMAIN}/user/create-paypal-order`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product:{
                    cost: "10"
                }
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
                orderID: data.orderID
            })
        })
        .then((response) => response.json())
    }

    return (
        <div className="checkout-page container d-flex align-items-center flex-column">
            <div className="checkout-info-section bg-black my-5 h-50 w-75">
                abc
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