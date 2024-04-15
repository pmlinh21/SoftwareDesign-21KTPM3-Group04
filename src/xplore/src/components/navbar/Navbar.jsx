import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"

import { RoleKey } from "../../util/config";

import "./Navbar.css";

import Avatar from "../avatar/Avatar";
import LoginPopup from '../../pages/LoginPopup';
import SignupPopup from '../../pages/SignupPopup';

import {topicService} from "../../services/TopicService";

function capitalizeFirstLetter(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
}

export default function Navbar() {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const result = await topicService.getAllTopics();
            if (result.status === 200) {
                const topics = result.data.content;
                // Set the fetched topics into the topics state
                setTopics(topics);
            } else {
                console.log("error", result);
            }
        };

        fetchTopics(); // Call the function to fetch topics
    }, []); // Pass an empty array to ensure it only runs once on mount

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
                                {/* <span className="nav-link button1" onClick={showTopicDropdown}>
                                    Topics
                                    <i className="fa-solid fa-chevron-down ms-2"></i>
                                </span> */}
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
                        <li className="nav-item" >
                            <Link className="nav-link" to="/profile">
                                <Avatar />
                            </Link>
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