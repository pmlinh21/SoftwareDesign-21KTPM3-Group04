import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link   } from 'react-router-dom';
import { useSelector   } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/commons.css";

import Loading from '../components/loading/Loading'
import Membership from '../components/membership/Membership';

import {PAYPAL_CLIENTID, DOMAIN} from '../util/config'
import {formartToSQLDatetime, formatToTimeDMY} from '../util/formatDate'

import { commonService } from '../services/CommonService';

const initialOptions = {
    clientId: PAYPAL_CLIENTID,
    currency: "USD",
    intent: "capture",
};

function Checkout() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_membership = parseInt(searchParams.get('id_membership'));

    const {user_login} = useSelector(state => state.UserReducer);
    const [membership, setMembership] = useState(null);
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {

        const fetchMembership = async () => {
            try{
                setLoading(true)
                const result = await commonService.getMembershipById(id_membership);
                const membership = result.data.content;
                setMembership(membership);
                setDate({
                    start_date: new Date(),
                    end_date: new Date(Date.now() + ( membership.duration * 24 * 60 * 60 * 1000))
                })
                setLoading(false)
            } catch(err){
                console.log(err);
            }
        }

        fetchMembership()
    }, [id_membership])

    const createOrder = (data) => {
        console.log(membership)
        return fetch(`${DOMAIN}/user/create-paypal-order`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price: membership?.price
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
                    price: membership?.price,
                    id_membership: membership?.id_membership,
                    id_user: user_login.id_user,
                    status: 1,
                    start_time: formartToSQLDatetime(date?.start_date),
                    end_time: formartToSQLDatetime(date?.end_date)
                }
            })
        })
        .then((response) => {
            if (response.status === 200) {
                setIsSuccess(true)
            }
            response.json()
        })
    }

    return (
        <div className="checkout-page container d-flex align-items-center flex-column h-100">
            <div className='container my-5'>
                <p className='subtitle1 text-center text-scheme-primary'>PRICING</p>
                <h4 className="text-center">Checkout</h4>
            </div>
        {
            loading && (
                <Loading/>
            )
        }
        {
            !loading && !isSuccess && (
                <div className="d-flex justify-content-evenly row col-12">
                    <div className="checkout-info-section d-flex col-4 flex-column"> 
                        <p className="title2 text-scheme-primary mb-3">Subscription information</p>
                        <p className="p1 d-flex justify-content-between mb-2">
                            <span className="button1 text-scheme-main-text mt-1">Payment</span>
                            <span className='text-capitalize'>{membership?.type} membership</span>
                        </p>
                        <p className="p1 d-flex justify-content-between mb-2">
                            <span className="button1 text-scheme-main-text mt-1"> Start date </span>
                            <span>{formatToTimeDMY(date?.start_date)}</span>
                        </p>
                        <p className="p1 d-flex justify-content-between mb-2">
                        <span className="button1 text-scheme-main-text mt-1"> Expired date </span> 
                            <span>{formatToTimeDMY(date?.end_date)}</span>
                        </p>
                        <p className="title2 text-scheme-primary mt-4 mb-3">User information</p>
                        <div className="form-group">
                            <label className="label2">Full name</label>
                            <input type="text" name="fullname" value={user_login?.fullname} disabled/>
                        </div>
                        <div className="form-group mb-4">
                            <label className="label2">Email address</label>
                            <input type="email" name="email" value={user_login?.email} disabled/>
                        </div>
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons 
                                style={{ layout: "horizontal" }}
                                createOrder={(data,actions) => createOrder(data,actions)}
                                onApprove={(data,actions) => onApprove(data,actions)}
                                messages={{
                                }} 
                                />
                        </PayPalScriptProvider>
                        <Link to="/pricing" className="button2 bg-white text-neutral-700 mt-2">
                            <i className="text-neutral-700 fa-solid fa-arrow-left me-2"></i>Back to Pricing
                        </Link>
                    </div>
                    <Membership membership={membership}/>
                </div>
            )
        }
        {
            !loading && isSuccess && (
                <div className="d-flex justify-content-center align-items-center 
                    flex-column row col-4 p-5 rounded-3 shadow">
                    <i className="fa-solid fa-circle-check text-center m-0 mb-4 p-0 text-success" 
                        style={{ fontSize: '3rem' }}></i>
                    <h6 className="text-center mb-5">Your membership has been activated successfully</h6>
                    <Link to="/" className="col-12 button2 bg-white text-neutral-700 p-3">
                        <i className="text-neutral-700 fa-solid fa-arrow-left me-2"></i>Back to Home
                    </Link>
                </div>

            )
        }
        </div>
        
       

    )
}
export default Checkout;