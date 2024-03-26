import React from "react";
import "./Navbar.css";
import Avatar from "../avatar/Avatar";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container justify-content-between align-items-center">
                <div>
                    <a className="navbar-brand d-flex gap-1 align-items-center" href="#">
                        <img src="/logo128.png" alt="logo" width="30" height="30" className="align-self-center"/>
                        XPlore
                    </a>
                </div>
                <div className="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item title2"><a className="nav-link active" aria-current="page" href="#">Home</a></li>
                        <li className="nav-item title2"><a className="nav-link" href="#">About us</a></li>
                        <li className="nav-item title2"><a className="nav-link" href="#">Topics</a></li>
                        <li className="nav-item title2"><a className="nav-link" href="#">Support</a></li>
                        <li className="nav-item title2"><a className="nav-link" href="#">Pricing</a></li>
                    </ul>
                </div>
                <div className="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-regular fa-bookmark"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-regular fa-bell"></i>
                            </a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" href="#">
                                <Avatar />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}