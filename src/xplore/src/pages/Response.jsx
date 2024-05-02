import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/avatar/Avatar'
import { formatToMD } from "../util/formatDate"
import {userService} from '../services/UserService'
import "../styles/commons.css"
import "./Library.css"

export default function Response(props) {
    const {id_response, id_user, id_post, response, response_time, reply, reply_time} = props.response || {};
    const author = props.author;
    const [textValue, setTextValue] = useState('');
    const handleTextAreaChange = (event) => {
        setTextValue(event.target.value);
    };
    
    return (
        <div>
            {/* Reader's response */}
            <div className='d-flex justify-content-between align-items-center my-4'>
                <div className='d-flex gap-2 align-items-center'>
                    <Avatar avatar={author?.avatar} size="small"/>
                    <p className='button2 m-0'>{author?.fullname || "Author name"}</p>
                    <p className='p2 m-0' style={{ color: 'var(--scheme-sub-text)'}}>{(response_time && formatToMD(response_time)) || "Aug 6"}</p>
                </div>
                <div className='d-flex'>
                    <button className='link-md button2' style={{ color: 'var(--blue-500)' }}>Reply</button>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <p className='p1'>{author?.response}</p>
            </div>
            {/* Author reply */}
            <div className='d-flex justify-content-between align-items-center my-4' style={{ marginLeft: '5rem'}}>
                <div className='d-flex gap-2 align-items-center'>
                    <Avatar avatar={author?.avatar} size="small"/>
                    <p className='button2 m-0'>{author?.fullname || "Author name"}</p>
                    <p className='p2 m-0' style={{ color: 'var(--scheme-sub-text)'}}>{(response_time && formatToMD(response_time)) || "July 24, 2024"}</p>
                </div>
                <div className='d-flex'>
                    <button className='link-md button2' style={{ color: 'var(--blue-500)' }}>Reply</button>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <p className='p1'>{author?.response}</p>
            </div>
            {/* Send response */}
            <div className='d-flex flex-row gap-3 m-0'>
                <Avatar avatar={author?.avatar} size="small"/>
                <textarea
                    value={textValue}
                    onChange={handleTextAreaChange}
                    placeholder="Enter your text here..."
                    rows={6}
                    cols={70}
                    style={{ resize: 'none', padding: '10px 14px' }} // Prevent resizing of the text area
                />
                <button className='prim-btn btn-md' style={{width: '104px'}}>Send</button>
            </div>
        </div> 
    )
}