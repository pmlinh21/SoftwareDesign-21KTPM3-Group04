import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'
import Avatar from '../avatar/Avatar';

export default function Notification(props) {
    const [tab, setTab] = useState(props.link);
    const [all, setAll ] = useState([]);
    const [subscribe, setSubscribe ] = useState([]);
    const [like, setLike ] = useState([]);
    const [response, setResponse ] = useState([]);

    const {user_login} = useSelector(state => state.UserReducer)

    const fetchNotifications = async () => {
        try{
            const result = await userService.getNotification(user_login?.id_user)
            if (result.status === 200) {
                setAll(result.data.content)
            }
        }catch(e){
            console.log("error", e);
        }
    }

    useEffect(() => {
        fetchNotifications()
    },[])

    useEffect(() => {
        setSubscribe(all.filter(noti => noti.noti_type == 4))
        setLike(all.filter(noti => noti.noti_type == 1))
        setResponse(all.filter(noti => noti.noti_type == 2 || noti.noti_type == 3))
    },[all.length])

    console.log(subscribe)
    console.log(like)
    console.log(response)

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