import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'
import Avatar from '../avatar/Avatar';
import { UserService } from '../../services/UserService';

export default function Notification(props) {
    const [tab, setTab] = useState(props.link);
    const [all, setAll ] = useState([]);
    const [subscribe, setSubscribe ] = useState([]);
    const [like, setLike ] = useState([]);
    const [response, setResponse ] = useState([]);
    const [focusedTab, setFocusedTab] = useState('All');

    const {user_login} = useSelector(state => state.UserReducer)

    const fetchNotifications = async () => {
        try{
            const result = await UserService.getNotification(user_login?.id_user)
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

    const handleTabFocus = (tabName) => {
        setFocusedTab(tabName);
    };

    return (
        <div className='notification-overlay'>
            <div className='notification'>
                <p className='title2 text-black'>Notifications</p>
                {/* Tabs */}
                <ul className='tab-panel d-flex flex-row gap-2'>
                    <li className={focusedTab === 'All' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('All')}>All</li>
                    <li className={focusedTab === 'Like' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Like')}>Like</li>
                    <li className={focusedTab === 'Respond' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Respond')}>Respond</li>
                    <li className={focusedTab === 'Subscribe' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Subscribe')}>Subscribe</li>
                </ul>
                {/* Notification badge */}
                
            </div>
        </div>
    )
}