import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/commons.css";
import "./Pricing.css"
import { commonService } from "../services/CommonService";
import {formatCapitalFirstLetter} from '../util/formatText';

function Pricing() {
    const [membership, setMembership] = useState([]);

    useEffect( () => {
        async function fetchMembership(){
            try {
                const result = await commonService.getAllMembership();
                if (result.status === 200) {
                    setMembership(result.data.content.map(item => {
                        return {
                            ...item,
                            description: item.description.map(desc => formatCapitalFirstLetter(desc))
                        }
                    }))
                }
            } catch (error) {
                console.log("error", error.response);
                alert(error.response.data.message)
            }
        }
        
        fetchMembership()
    }, [])

    console.log(membership);
    return (
        <div>
            {/*Headline*/}
            <div className='container-fluid hero-banner'>
                <div className='container' style={{ padding: '72px 0' }}>
                    <p className='subtitle1' style={{ color: 'var(--scheme-primary)',
    textAlign: 'center' }}>PRICING</p>
                    <h4 style={{ textAlign: 'center' }}>Membership Plans</h4>
                    <p className='p1 subtext'>Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
                    {/* Membership */}
                    <div className='row' style={{ marginTop: '72px', marginBottom: '0px'}}>
                        <div className='col-2'></div>
                        {membership.map((membership, index) => (
                            <div key={index} className='col-4 membership-ctn' style={{ display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
                                {/* Membership type */}
                                <div style={{ alignSelf: 'center' }}>
                                    <img src="/imgs/Featured icon.png" style={{ width: '40px' }}/>
                                </div>
                                <p className='title2 capitalize' id='membership-type'>{membership.type} Membership</p>
                                {/* Membership price */}
                                <h4 id='membership-price'>$ {membership.price}</h4>
                                {/* Membership description */}
                                {membership?.description?.map((desc, i) => (
                                    <div key={i} className='flex-row' style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <img src="/imgs/Check icon.png" style={{ width: '24px', height: 'auto' }} />
                                        <p style={{ marginLeft: '8px', color: 'var(--neutral-700' }}>{formatCapitalFirstLetter(desc)}</p>
                                    </div>
                                ))}
                                <button className='prim-btn btn-md'>Get Started</button>
                            </div>
                        ))}
                        <div className='col-2'></div>
                    </div>
                </div>
            </div>
            {/*Free trial*/}
            <div className='container-fluid'>
                <div className='container free-trial d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <h6>Start your 30-day free trial</h6>
                        <p className='p1' style={{color: 'var(--blue-700)'}}>Join over 4,000+ startups already growing with Untitled.</p>
                    </div>
                    <div className='d-flex' style={{ justifyContent: 'flex-end', gap: '16px'}}>
                        <button className='tert-btn btn-md' style={{ width: '140px'}}>Learn more</button>
                        <button className='prim-btn btn-md' style={{ width: '140px'}}>Get started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pricing;