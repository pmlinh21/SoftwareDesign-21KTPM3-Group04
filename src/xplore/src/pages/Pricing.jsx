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
        <div className='container-fluid'>
            <p className='subtitle1'>About us</p>
        </div>
    )
}
export default Pricing;