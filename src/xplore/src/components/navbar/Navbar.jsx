import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"

import { RoleKey, USER_LOGIN } from "../../util/config";

import "./Navbar.css";

import Avatar from "../avatar/Avatar";
import LoginPopup from '../../pages/LoginPopup';
import SignupPopup from '../../pages/SignupPopup';

import { getAllTopicsAction } from '../../redux/actions/TopicAction';

function capitalizeFirstLetter(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
}

function logout() {
    localStorage.removeItem(USER_LOGIN);
    localStorage.setItem(RoleKey, JSON.stringify(4));
    window.location.reload();
}

export default function Navbar() {
    // Get user information from localStorage (user's avatar)
    let user_login = {};
    if(localStorage.getItem(USER_LOGIN)){
        user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
    }

    const dispatch = useDispatch();
    
    // Get all topics
    useEffect(() => {
        dispatch(getAllTopicsAction()); // Dispatch the getAllTopics action when the component mounts
    }, [dispatch]);
   
    const topics = useSelector(state => state.TopicReducer.topics);
    console.log("topics: ", topics);

    // Set up login and signup popups
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    const roleId = localStorage.getItem(RoleKey);
    if(!roleId) {
        localStorage.setItem(RoleKey, JSON.stringify(4));
    }
    
    console.log(roleId);
    useEffect(() => {
        if (roleId === "4") {
            const userNav = document.getElementById("user-nav");
            const guestNav = document.getElementById("guest-nav");
            if (userNav) userNav.style.display = "none";
            if (guestNav) guestNav.style.display = "block";
        }

    }, [roleId]);

    function toggleLoginPopup(){
        setShowLoginPopup(!showLoginPopup);
    };

    function toggleSignupPopup(){
        setShowSignupPopup(!showSignupPopup);
    };

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
                                <Link className="nav-link button1" to="/about-us">About us</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link subtitle1 button1 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Topics
                                </a>
                                {topics && topics.length > 0 ? (
                                    <ul className="dropdown-menu">
                                        {topics.map(topic => (
                                            <li key={topic.id_topic}>
                                                <Link className="dropdown-item" to={'/#'} >
                                                    {capitalizeFirstLetter(topic.topic)}
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
                            <Link className="nav-link blue-500" to="/write">
                                <i className="fa-regular fa-pen-to-square me-2"></i>Write
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list">
                                <i className="fa-regular fa-bookmark"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="fa-regular fa-bell"></i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown" >
                            <Link className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Avatar avatar={user_login.avatar} size="small"/>
                            </Link>

                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to={'/profile'} >
                                       Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" ></hr></li>
                                <li>
                                    <Link className="dropdown-item" to={'/'} onClick={logout}>
                                       Log out
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