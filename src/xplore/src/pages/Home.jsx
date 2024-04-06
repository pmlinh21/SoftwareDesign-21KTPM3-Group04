import React, { useState } from 'react';
import "../styles/commons.css";
import Navbar from '../components/navbar/Navbar';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import { RoleKey } from "../util/config";

export default function Home() {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    const roleId = localStorage.getItem(RoleKey);
    if(!roleId)
        localStorage.setItem(RoleKey, JSON.stringify(4));
    
    console.log(roleId);

    function toggleLoginPopup(){
        setShowLoginPopup(!showLoginPopup);
    };

    function toggleSignupPopup(){
        setShowSignupPopup(!showSignupPopup);
    };

    return (
        <div className='homepage'>
            {/* <Navbar/> */}
            <div className="container-fluid grid">
                <section className="container-sm col-6 grid">
                    <div className="row my-10">
                        <h1 className="text-center col">The world's destination for avid readers</h1>
                    </div>
                    <div className="row my-5">
                        <p className="p1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="row my-5">
                        <div className="gap-3 d-flex justify-content-center">
                            <button className="button1 btn-nm sec-btn" onClick={toggleLoginPopup}>Get started</button>
                            <button className="button1 btn-nm prim-btn" onClick={toggleSignupPopup}>
                                <i className="fa-solid fa-book-open"></i> Learn more
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            {showLoginPopup ? <LoginPopup toggle={toggleLoginPopup} /> : null}
            {showSignupPopup ? <SignupPopup toggle={toggleSignupPopup} /> : null}
        </div>
    );
}

