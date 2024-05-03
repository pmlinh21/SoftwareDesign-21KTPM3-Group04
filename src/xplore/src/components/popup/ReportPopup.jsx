import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../../styles/commons.css";
import "./ReportPopup.css"
import {formartToSQLDatetime} from '../../util/formatDate'
import {reportService} from '../../services/ReportService'
import Loading from '../system-feedback/Loading';

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

    const handleSendReport = async () => {
        if (id_report_type == ''){
            alert("Please select a reason");
            return;
        }
        if (id_response){
            try{
                setLoading(true)
                await reportService.createReportResponse({
                    id_user: user_login.id_user,
                    id_report_type: id_report_type,
                    id_response: id_response,
                    is_reply: isReplyReport,
                    report_time: formartToSQLDatetime(new Date())
                })
                setResult(true)
                setLoading(false)
            } catch (e){
                console.log(e)
            }
        } else if (id_post){
            try{
                setLoading(true)
                await reportService.createReportPost({
                    id_user: user_login.id_user,
                    id_report_type: id_report_type,
                    id_post: id_post,
                    report_time: formartToSQLDatetime(new Date())
                })
                setResult(true)
                setLoading(false)
            } catch (e){
                console.log(e)
            }
        }
    }

    const handleCancelButton = () =>{
        setReportContent(null)
    }

    return (
        <div className="report-response-overlay">
        <div className="report-response ">
        {loading && <Loading/>}

        {!loading && !result && (
        <>
            <p className="text-start">
                <span className="title1">Report inappropriate </span>
                <span className="title1">
                    {
                        id_response? " response?" : " post?"
                    }
                </span>
            </p>
            <p className="text-start my-2 p1">We rely on Xplore community members to report or flag content that they find inappropriate. </p>
            <p className="text-start p1">Reporting content is anonymous, so other users can't tell who made the report. </p>

            <div className="mb-5 text-start">
                <label className="p1 me-3" htmlFor="reportReason">Select the reason that you want to report</label>
                <select id="reportReason" value={id_report_type} onChange={handleChange}>
                    <option className="p1" value="">(Empty)</option>  // Default option className="p1" prompt
                    <option className="p1" value="1">Harassment</option>
                    <option className="p1" value="2">Rules Violation</option>
                    <option className="p1" value="3">Spam</option>
                </select>
            </div>
            <button type="button" className="btn button2 bg-white text-scheme-sub-text me-4"
                onClick={handleCancelButton}>
                Cancel
            </button>
            <button type="button" className="btn sec-btn report-btn button2 bg-error text-white p-3"
                onClick={handleSendReport}>
                Send report
            </button>
        </>
        )}

        {!loading && result && (
            <div className="d-flex justify-content-center align-items-center 
                    flex-column row px-5 rounded-3">
                <i className="fa-solid fa-circle-check text-center m-0 mb-4 p-0 text-success" 
                    style={{ fontSize: '3rem' }}></i>
                <h6 className="text-center mb-5">Your report has been sent successfully</h6>
                <button type="button" className="btn button2 bg-white text-scheme-sub-text"
                    onClick={handleCancelButton}>
                    Cancel
                </button>
            </div>
        )}
        </div>
        </div>
    );
};