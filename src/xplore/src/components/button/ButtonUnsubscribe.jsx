import React from "react";
import "./ButtonUnsubscribe.css";
import { unfollowAuthorAction } from "../../redux/actions/UserAction";
import { useDispatch } from 'react-redux';

export default function Button3({user, subscriber}) {
    const dispatch = useDispatch();
    
    const handleUnfollow = (e) => {
        e.stopPropagation()
        dispatch(unfollowAuthorAction(user, subscriber));
    };

    return (
        <button className="px-3 py-2 tert-btn button3 rounded-pill text-scheme-sub-text border-scheme-sub-text" onClick={handleUnfollow}>
            Unfollow
        </button>
    )
}