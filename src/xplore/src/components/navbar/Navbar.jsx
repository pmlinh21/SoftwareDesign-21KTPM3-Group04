import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link , useNavigate, useLocation} from "react-router-dom"

import { RoleKey, USER_LOGIN, TokenKey } from "../../util/config";
import { formatCapitalFirstLetter } from '../../util/formatText';

import "./Navbar.css";

import Avatar from "../avatar/Avatar";
import LoginPopup from '../../pages/LoginPopup';
import SignupPopup from '../../pages/SignupPopup';
import Notification from '../notification/Notification';

import { getAllTopicsAction } from '../../redux/actions/TopicAction';
import { getUserByEmailAction, logOut } from '../../redux/actions/UserAction';

export default function Navbar() {
    // Get user information from localStorage (user's avatar)
    const {user_login} = useSelector(state => state.UserReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get all topics
    useEffect(() => {
        if (topics == null)
            dispatch(getAllTopicsAction()); // Dispatch the getAllTopics action when the component mounts
    }, []);
   
    const topics = useSelector(state => state.TopicReducer.topics);
    // console.log("topics: ", topics);

    // Set up login and signup popups
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const signup = location.state && location.state.signup;
        const check = location.state && location.state.check;

        if(check){
            if (signup ) {
                setShowSignupPopup(true);
                setShowLoginPopup(false);
            }
            else{
                setShowSignupPopup(false);
                setShowLoginPopup(true);
            }
        }
    }, [location.state]);

    var roleId = localStorage.getItem(RoleKey);
    if(!roleId) {
        localStorage.setItem(RoleKey, JSON.stringify(4));
    }
    
    // console.log(roleId);
    useEffect(() => {
        const userNav = document.getElementById("user-nav");
        const guestNav = document.getElementById("guest-nav");
        if (roleId === "4") {
            if (userNav) userNav.style.display = "none";
            if (guestNav) guestNav.style.display = "block";
        }
        else{
            if (userNav) userNav.style.display = "block";
            if (guestNav) guestNav.style.display = "none";
            
        }

    }, [roleId]);

    function toggleLoginPopup(){
        setShowLoginPopup(!showLoginPopup);
    };

    function toggleSignupPopup(){
        setShowSignupPopup(!showSignupPopup);
    };

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        if (params.has('email')) {
            const email = params.get('email');
            dispatch(getUserByEmailAction(email)).then(() => {
                roleId = localStorage.getItem(RoleKey);
                console.log(roleId);
                const userNav = document.getElementById("user-nav");
                const guestNav = document.getElementById("guest-nav");
                if (roleId === "4") {
                    if (userNav) userNav.style.display = "none";
                    if (guestNav) guestNav.style.display = "block";
                }
                else{
                    if (userNav) userNav.style.display = "block";
                    if (guestNav) guestNav.style.display = "none";
                }
            });
            // dispatch(get)
        }
    }, []);

    function logout() {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TokenKey);
        
        localStorage.setItem(RoleKey, JSON.stringify(4));
    
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(logOut());
        navigate("/");
    }

    // Notification
    const [showNotification, setShowNotification] = useState(false);

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    }
    
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container justify-content-between align-items-center">
                <div className="d-flex">
                    <Link className="navbar-brand d-flex gap-1 align-items-center" to="/">
                        <img src="/logo128.png" alt="logo" width="24" height="24" className="align-self-center"/>
                        XPlore
                    </Link>

                    <div className="nav ms-3">
                        <ul className="navbar-nav d-flex flex-row gap-3">
                            {/* <li className="nav-item title2"><a className="nav-link active" aria-current="page" href="/">Home</a></li> */}
                            <li className="nav-item subtitle1">
                                <Link className="nav-link button1" to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link subtitle1 button1 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Topics
                                </a>
                                {topics && topics.length > 0 ? (
                                    <ul className="dropdown-menu">
                                        {topics.map(topic => (
                                            <li key={topic.id_topic}>
                                                <Link className="dropdown-item button2 text-start py-2" 
                                                    to={`/topic/?id_topic=${topic.id_topic}&topic_name=${topic.topic}`} >
                                                    {formatCapitalFirstLetter(topic.topic)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </li>
                            <li className="nav-item subtitle1">
                                <Link className="nav-link button1" to="/support">Support</Link>
                            </li>
                            <li className="nav-item subtitle1">
                                <Link className="nav-link button1" to="/pricing">Pricing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="nav" id="user-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item subtitle1 me-4">
                            <Link className="nav-link blue-500 button2" to="/write">
                                <i className="fa-regular fa-pen-to-square me-2"></i>Write
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list">
                                <i className="fa-regular fa-bookmark"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={toggleNotification}>
                                <i className="fa-regular fa-bell"></i>
                                {showNotification && <Notification />}
                            </Link>
                        </li>
                        <li className="nav-item dropdown" >
                            <div className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Avatar avatar={user_login?.avatar} size="small"/>
                            </div>

                            <ul className="dropdown-menu dropdown-menu-end button3 text-start text-scheme-sub-text">
                                <li>
                                    <Link className="dropdown-item button2 text-start py-2" to={'/my-profile'} >
                                       View profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item button2 text-start py-2" to={'/list'}>
                                       Library
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item button2 text-start py-2" to={'/drafts'} >
                                       Posts
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item button2 text-start py-2" to={'/statistics'} >
                                       Stats
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" ></hr></li>
                                <li>
                                    <Link className="dropdown-item button2 text-start py-2" to={'/'} onClick={logout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Log out
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="nav" id="guest-nav" style={{display: "none"}}>
                    <button className="button2 btn-md link-nm" onClick={toggleLoginPopup} >Log in</button>
                    <button className="button2 btn-md prim-btn" onClick={toggleSignupPopup} >Sign up</button>
                </div>
            </div>
            
            {showLoginPopup ? <LoginPopup toggle={toggleLoginPopup} /> : null}
            {showSignupPopup ? <SignupPopup toggle={toggleSignupPopup} /> : null}
        </nav>
    )
}