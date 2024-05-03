import React from "react";
import "./ButtonUnblock.css";
import { unblockUserAction } from "../../redux/actions/UserAction";
import { useDispatch } from 'react-redux';

export default function ButtonUnblock({user, block}) {
    const dispatch = useDispatch();
    
    const handleUnblock = () => {
        dispatch(unblockUserAction(user, block));
    };

    return (
        <button className="px-3 py-2 tert-btn button3 rounded-pill text-scheme-sub-text border-scheme-sub-text" onClick={handleUnblock}>
            Unblock
        </button>
    )
}