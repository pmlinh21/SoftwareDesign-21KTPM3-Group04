import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../styles/commons.css";
import "./ReportResponsePopup.css"
// import {  } from "../../redux/actions/ReportAction";
import Loading from '../components/loading/Loading';

export default function ReportResponsePopup(props) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const { post, response} = props;

    return (
        <div className="report-response-overlay">
        <div className="report-response">
        {loading ? (
            <Loading/>
        ):(
        <>
            
            <button type="button" className="btn prim-btn" onClick={handleSigninWithGoogle}>
                <img src="/search.png" alt="google" style={{ marginRight: "10px" }}/>
                Send report
            </button>

        </>
        ) }
        </div>
        </div>
    );
};