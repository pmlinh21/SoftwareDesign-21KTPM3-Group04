import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/commons.css"
import "./Pricing.css"
import { commonService } from "../services/CommonService"
import {formatCapitalFirstLetter} from '../util/formatText'
import Membership from '../components/membership/Membership'

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
                        {membership.map((membership) => (
                            <Membership key={membership.id_membership} membership={membership}/>
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
                        <p className='p1' style={{color: 'var(--blue-700)'}}>Join over 4,000+ startups already growing with Xplore.</p>
                    </div>
                    <div className='d-flex' style={{ justifyContent: 'flex-end', gap: '16px'}}>
                        <button className='tert-btn btn-md' style={{ width: '140px'}}>Learn more</button>
                        <button className='prim-btn btn-md' style={{ width: '140px'}}>Get started</button>
                    </div>
                </div>
            </div>

            {/*Need help */}
            <div className='container-fluid' style={{ marginTop: '64px' }}>
                <div className='container'>
                    <p className='subtitle1' style={{color: 'var(--blue-500)'}}>NEED HELP?</p>
                    <h5 style={{ marginBottom: '64px' }}>Frequently asked questions</h5>
                    <div className='d-flex flex-row' style={{ gap: '96px'}}>
                        <div className='col'>
                            <div className='d-flex flex-row gap-4' style={{marginTop: '64px'}}>
                                <img src="/imgs/pricing_1.png" style={{ width: '48px', height: '48px'}} />
                                <div className='d-flex' style={{ flexDirection: 'column'}}>
                                    <p className='title2'>Is there a free trial available?</p>
                                    <p style={{ color: 'var(--neutral-600)'}}>Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                                </div>
                            </div>
                            <div className='d-flex flex-row gap-4 my-2'>
                                <img src="/imgs/pricing_2.png" style={{ width: '48px', height: '48px'}} />
                                <div className='d-flex' style={{ flexDirection: 'column'}}>
                                    <p className='title2'>Is there a free trial available?</p>
                                    <p style={{ color: 'var(--neutral-600)'}}>Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                                </div>
                            </div>
                            <div className='d-flex flex-row gap-4 my-2'>
                                <img src="/imgs/pricing_3.png" style={{ width: '48px', height: '48px'}} />
                                <div className='d-flex' style={{ flexDirection: 'column'}}>
                                    <p className='title2'>Is there a free trial available?</p>
                                    <p style={{ color: 'var(--neutral-600)'}}>Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                                </div>
                            </div>
                            <div className='d-flex flex-row gap-4 my-2'>
                                <img src="/imgs/pricing_4.png" style={{ width: '48px', height: '48px'}} />
                                <div className='d-flex' style={{ flexDirection: 'column'}}>
                                    <p className='title2'>Is there a free trial available?</p>
                                    <p style={{ color: 'var(--neutral-600)'}}>Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col' >
                            <img src="/imgs/faq_img.jpg" style={{ width: '100%'}} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Pricing;