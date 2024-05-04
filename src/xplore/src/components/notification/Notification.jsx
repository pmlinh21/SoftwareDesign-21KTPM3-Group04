// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import './Notification.css'
// import Avatar from '../avatar/Avatar';
// import { userService } from '../../services/UserService';

// export default function Notification(props) {
//     const [tab, setTab] = useState(props.link);
//     const [all, setAll ] = useState([]);
//     const [subscribe, setSubscribe ] = useState([]);
//     const [like, setLike ] = useState([]);
//     const [response, setResponse ] = useState([]);
//     const [focusedTab, setFocusedTab] = useState('All');
//     const [content, setContent] = useState([]);

//     const {user_login} = useSelector(state => state.UserReducer)

//     const fetchNotifications = async () => {
//         try{
//             const result = await userService.getNotification(user_login?.id_user)
//             if (result.status === 200) {
//                 console.log(result.data.content)
//                 setAll(result.data.content)
//             }
//         }catch(e){
//             console.log("error", e);
//         }
//     }

//     useEffect(() => {
//         fetchNotifications()
//     },[])

//     useEffect(() => {
//         setSubscribe(all.filter(noti => noti.noti_type == 4))
//         setLike(all.filter(noti => noti.noti_type == 1))
//         setResponse(all.filter(noti => noti.noti_type == 2 || noti.noti_type == 3))
//     },[all.length])

//     console.log(subscribe)
//     console.log(like)
//     console.log(response)

//     const handleTabFocus = (tabName) => {
//         setFocusedTab(tabName);
//     }; 

//     return (
//         <div className='notification-overlay'>
//             <div className='notification'>
//                 <p className='title2 text-black'>Notifications</p>
//                 {/* Tabs */}
//                 <ul className='tab-panel d-flex flex-row gap-2'>
//                     <li className={focusedTab === 'All' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('All')}>All</li>
//                     <li className={focusedTab === 'Like' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Like')}>Like</li>
//                     <li className={focusedTab === 'Respond' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Respond')}>Respond</li>
//                     <li className={focusedTab === 'Subscribe' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Subscribe')}>Subscribe</li>
//                 </ul>
//                 {/* Notification content */}
//                 {
//                     all?.map( (noti)=>{
//                         return(
//                             // {/* Notification badge */}
//                             <div className='notification-content d-flex flex-row noti-content gap-2' key={noti.id_noti}>
//                                 {/* Avatar */}
//                                 <Avatar avatar={noti?.avatar} size="small"/>
//                                 <div className='d-flex flex-column gap-1'>
//                                     <div className='d-flex flex-row align-items-center gap-1'>
//                                         {/* Creator */}
//                                         <p className='button3 m-0'>{noti?.creator_user?.fullname}</p>
//                                         <p className='p3 m-0'>{content}</p>
//                                     </div>
//                                     {/* Noti_time */}
//                                     <p className='support text-scheme-sub-text m-0'>{noti?.noti_time}</p>
//                                 </div>
//                             </div>
//                         )
//                     }
//                     )
//                 }
//             </div>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Notification.css';
import Avatar from '../avatar/Avatar';
import { userService } from '../../services/UserService';
import { formatToMDY } from '../../util/formatDate';

export default function Notification(props) {
    const [tab, setTab] = useState(props.link);
    const [all, setAll] = useState([]);
    const [focusedTab, setFocusedTab] = useState('All');
    const [subscribe, setSubscribe ] = useState([]);
    const [like, setLike ] = useState([]);
    const [response, setResponse ] = useState([]);

    const { user_login } = useSelector(state => state.UserReducer);

    const fetchNotifications = async () => {
        try {
            const result = await userService.getNotification(user_login?.id_user);
            if (result.status === 200) {
                console.log(result.data.content);
                setAll(result.data.content);
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleTabFocus = (tabName) => {
        setFocusedTab(tabName);
    };

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
                <p className='title2 text-black'>Notifications</p>
                {/* Tabs */}
                {/* <ul className='tab-panel d-flex flex-row gap-2'>
                    <li className={focusedTab === 'All' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('All')}>All</li>
                    <li className={focusedTab === 'Like' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Like')}>Like</li>
                    <li className={focusedTab === 'Respond' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Respond')}>Respond</li>
                    <li className={focusedTab === 'Subscribe' ? 'tab-item button2 focused' : 'tab-item button2'} onClick={() => handleTabFocus('Subscribe')}>Subscribe</li>
                </ul> */}
                {/* Notification content */}
                <div className="notification-content">
                    {all?.map((noti) => (
                        <NotificationItem key={noti.id_noti} noti={noti} />
                    ))}
                    {like?.map((noti) => (
                        <NotificationItem key={noti.id_noti} noti={noti} />
                    ))}
                    {response?.map((noti) => (
                        <NotificationItem key={noti.id_noti} noti={noti} />
                    ))}
                    {subscribe?.map((noti) => (
                        <NotificationItem key={noti.id_noti} noti={noti} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function NotificationItem({ noti }) {
    let content;

    switch (noti.noti_type) {
        case 1:
            content = `liked your post ${noti.post_info || ""}`;
            break;
        case 2:
            content = `responded to your post ${noti.post_info || ""}`;
            break;
        case 3:
            content = `replied to your response ${noti.response_info || ""} on the post ${noti.post_info || ""}`;
            break;
        case 4:
            content = `followed you`;
            break;
        default:
            content = "Unknown notification type";
    }

    return (
        <div className='notification-content d-flex flex-row noti-content gap-2' key={noti.id_noti}>
            {/* Avatar */}
            <Avatar avatar={noti?.creator_user?.avatar} size="small" />
            <div className='d-flex flex-column gap-1'>
                <div className='d-flex flex-row align-items-center gap-1'>
                    {/* Creator */}
                    <p className='button2 m-0'>{noti?.creator_user?.fullname}</p>
                    {/* Notification content */}
                    <p className='p2 m-0'>{content}</p>
                </div>
                {/* Noti_time */}
                <p className='support text-scheme-sub-text m-0'>{formatToMDY(noti?.noti_time)}</p>
            </div>
        </div>
    );
}