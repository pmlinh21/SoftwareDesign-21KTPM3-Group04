import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../../styles/commons.css";
import "./ReportPopup.css"
import {formartToSQLDatetime} from '../../util/formatDate'
import Loading from '../loading/Loading';

export default function ReportResponsePopup(props) {
    const {user_login} = useSelector(state => state.UserReducer);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const {id_response, id_post, isReplyReport} = props.reportContent;
    const {setReportContent} = props

    const [id_report_type, setReason] = useState(''); // State to hold the selected option

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    const handleSendReport = () => {
        if (id_report_type == ''){
            alert("Please select a reason");
            return;
        }
        if (id_response){
            console.log({
                id_user: user_login.id_user,
                id_report_type: id_report_type,
                id_response: id_response,
                is_reply: isReplyReport,
                report_time: formartToSQLDatetime(new Date())
            })
        } else if (id_post){
            console.log({
                id_user: user_login.id_user,
                id_report_type: id_report_type,
                id_post: id_post,
                report_time: formartToSQLDatetime(new Date())
            })
        }
        setReportContent(null)
    }

    const handleCancelButton = () =>{
        setReportContent(null)
    }

    return (
        <div className="report-response-overlay">
        <div className="report-response">
        {loading && <Loading/>}
        {
        !result ? (
        <>
            <p>
                <span className="p1">Do you want to report </span>
                <b>
                    <span className="p1">
                        {
                            id_response? "this response?" : "this post?"
                        }
                    </span>
                </b>
            </p>
            <div className="mb-5">
                <label className="p1 me-3" htmlFor="reportReason">Report Reason:</label>
                <select id="reportReason" value={id_report_type} onChange={handleChange}>
                    <option className="p1" value="">Select a reason</option>  // Default option className="p1" prompt
                    <option className="p1" value="1">Harassment</option>
                    <option className="p1" value="2">Rules Violation</option>
                    <option className="p1" value="3">Spam</option>
                </select>
            </div>
            <button type="button" className="btn button2 bg-white text-scheme-sub-text"
                onClick={handleCancelButton}>
                Cancel
            </button>
            <button type="button" className="btn sec-btn report-btn button2 bg-error text-white p-3"
                onClick={handleSendReport}>
                Send report
            </button>
        </>
        ) : (
            <>
            </>
        )
    }
        </div>
        </div>
    );
};