import React from "react";
import "./ButtonUnsubscribe.css";
import { followAuthorAction } from "../../redux/actions/UserAction";
import { useDispatch } from 'react-redux';

export default function ButtonSubscribe({user, subscriber, fullname}) {
    const dispatch = useDispatch();
    
    const handleFollow = () => {
        dispatch(followAuthorAction(user, subscriber, fullname));
    };
    return (
        <button className="px-3 py-2 tert-btn button3 rounded-pill text-scheme-primary border-scheme-primary" onClick={handleFollow}>
            Follow <i className="fa-solid fa-plus"></i>
        </button>
    )
}