import React, { useState, useEffect } from 'react'
import './Notification.css'

export default function Notification(props) {
    const [tab, setTab] = useState(props.link);
    const [all, setAll ] = useState([]);
    const [subscribe, setSubscribe ] = useState([]);
    const [like, setLike ] = useState([]);
    const [response, setResponse ] = useState([]);

    return (
        <div className='notification-overlay'>
            <div className='notification'>
                <p className='title2'>Notifications</p>
                <ul className='d-flex flex-row'>
                    <li className={`button2 tab-item ${tab === "all" ? "focused" : ""}`} id="for-all" onClick={() => setTab('all')}>All</li>
                </ul>
            </div>
        </div>
    )
}