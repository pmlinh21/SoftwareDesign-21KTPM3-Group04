import React, { useState, useEffect } from 'react'
import './Notification.css'
import Avatar from '../avatar/Avatar';

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
                {/* Tabs */}
                <ul className='tab-panel d-flex flex-row gap-2'>
                    <li className='tab-item button2 focused'>All</li>
                    <li className='tab-item button2'>Like</li>
                    <li className='tab-item button2'>Respond</li>
                    <li className='tab-item button2'>Subscribe</li>
                </ul>
                {/* Notification badge */}
                
            </div>
        </div>
    )
}