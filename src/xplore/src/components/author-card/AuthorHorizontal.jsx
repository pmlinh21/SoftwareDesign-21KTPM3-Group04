import React, { useState, useEffect } from 'react';
import "./AuthorHorizontal.css";
import Avatar from "../avatar/Avatar";
import ButtonUnsubscribe from "../button/ButtonUnsubscribe";
import ButtonSubscribe from "../button/ButtonSubscribe";
import { useDispatch, useSelector } from 'react-redux';
import { getUserFollowAction } from "../../redux/actions/UserAction";
import { useNavigate } from "react-router-dom";


export default function AuthorHorizontal(props) {
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;

    const {id_user, fullname, bio, avatar} = props.author;

    const dispatch = useDispatch();
    const user_follow = useSelector(state => state.UserReducer.user_follow);
    const [is_subscribe, setIsSubscribe] = useState(false);

    useEffect(() => {
        // console.log("1")
        if (user_follow === null && user_info !== null) {
            dispatch(getUserFollowAction(user_info?.id_user));
        }
    }, [user_follow]);

    
    useEffect(() => {
        // console.log("2")
        if (user_follow !== null) {
            setIsSubscribe(user_follow.some(item => item.id_user === id_user));
        }
    }, [user_follow]);

    const navigate = useNavigate();
    const handleAuthorClick = () => {
        navigate("/author-profile", { state: { author: props.author } });
    };

    return (
        <div className="author-horizontal py-3 pe-3 d-flex bg-white rounded-3 shadow-sm overflow-hidden w-100 shadow" style={{ cursor: 'pointer' }} onClick={handleAuthorClick}>
            <div className=" col-2 d-flex align-items-start justify-content-center ">
                <Avatar avatar={avatar} size="small"/>
            </div>

            <div className=" col-6 d-flex flex-wrap px-0 mx-0">
                <p className="button2 m-0">{fullname}</p>
                <div className="p3 m-0 mt-2 long-text text-scheme-sub-text">{bio}</div>
            </div>

            <div className=" col-4 d-flex align-items-center justify-content-center px-0 mx-0">
                {
                    is_subscribe?
                        <ButtonUnsubscribe user={props.author.id_user} subscriber={user_info?.id_user}/>
                    :
                        <ButtonSubscribe user={props.author.id_user} subscriber={user_info?.id_user} fullname={fullname}/>
                }
            </div>
        </div>
    )
}