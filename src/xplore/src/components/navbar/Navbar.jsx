import React from "react";
import "./Navbar.css";
import Avatar from "../avatar/Avatar";
import {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container justify-content-between align-items-center">
                <div className="d-flex ">
                    <Link className="navbar-brand d-flex gap-1 align-items-center" to="/">
                        <img src="/logo128.png" alt="logo" width="24" height="24" className="align-self-center"/>
                        XPlore
                    </Link>

                    <div className="nav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item title2"><a className="nav-link active" aria-current="page" href="/">Home</a></li> */}
                            <li className="nav-item subtitle1">
                                <Link className="nav-link" to="/about-us">About us</Link>
                            </li>
                            <li className="nav-item subtitle1">
                                <Link className="nav-link" to="#">
                                    Topics
                                    <i className="fa-solid fa-chevron-down ms-2"></i>
                                </Link>
                            </li>
                            <li className="nav-item subtitle1">
                                <Link className="nav-link" to="/support">Support</Link>
                            </li>
                            <li className="nav-item subtitle1">
                                <Link className="nav-link" to="/pricing">Pricing</Link>
                            </li>
                        </ul>
                    </div>

                </div>
                
                <div className="nav">
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
            </div>
        </nav>
    )
}