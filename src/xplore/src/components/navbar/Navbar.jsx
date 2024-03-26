import React from "react";
import "./Navbar.css";
import Avatar from "../avatar/Avatar";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container justify-content-between align-items-center">
                <div className="d-flex ">
                    <a className="navbar-brand d-flex gap-1 align-items-center" href="/">
                        <img src="/logo128.png" alt="logo" width="30" height="30" className="align-self-center"/>
                        XPlore
                    </a>

                    <div className="nav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item title2"><a className="nav-link active" aria-current="page" href="/">Home</a></li> */}
                            <li className="nav-item subtitle1"><a className="nav-link" href="/about-us">About us</a></li>
                            <li className="nav-item subtitle1">
                                <a className="nav-link" href="#">
                                    Topics
                                    <i className="fa-solid fa-chevron-down ms-2"></i>
                                </a>
                            </li>
                            <li className="nav-item subtitle1"><a className="nav-link" href="/support">Support</a></li>
                            <li className="nav-item subtitle1"><a className="nav-link" href="/pricing">Pricing</a></li>
                        </ul>
                    </div>

                </div>
                
                <div className="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item subtitle1 me-4">
                            <a className="nav-link blue-500" href="/write">
                                <i className="fa-regular fa-pen-to-square me-2"></i>Write
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/list">
                                <i className="fa-regular fa-bookmark"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-regular fa-bell"></i>
                            </a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" href="/profile">
                                <Avatar />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}