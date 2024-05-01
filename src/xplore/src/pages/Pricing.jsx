import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/commons.css";
import { commonService } from "../services/CommonService";
import {formatCapitalFirstLetter} from '../util/formatText';

function Pricing() {
    useEffect( () => {
        async function fetchMembership(){
            try {
                const result = await commonService.getAllMembership();
                if (result.status === 200) {
                    setMemberships(result.data.content.map(item => {
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

    const [memberships, setMemberships] = useState([]);
    console.log(memberships);
    return (
        <div>
            {/*Headline*/}
            <div className='container-fluid'>
                <div className='container' style={{padding: '72px 0'}}>
                    <p className='subtitle1' style={{color: 'var(--scheme-primary)',
    textAlign: 'center'}}>PRICING</p>
                    <h4 style={{textAlign: 'center'}}>Membership Plans</h4>
                    <p className='p1 subtext'>Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
                </div>
            </div>
        </div>
    )
}
export default Pricing;