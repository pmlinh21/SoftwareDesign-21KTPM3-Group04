import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom"

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid my-5">
                <div className="newsletter">
                    <div className="container">
                        <div className="d-flex flex-row justify-content-between py-5">
                            <div className="col-7 title">
                                <p className="title">Join our newsletter</p>
                                <p className="description p3">We'll send you a nice letter once per week. No spam.</p>
                            </div>
                            <div className="col-5">
                                <div className="d-flex flex-row gap-3">
                                    <input className="form-control" type="email" placeholder="Enter your email"/>
                                    <button className="button1 btn-nm prim-btn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="footer container py-5">
                    <div className="row">
                        <div className="col-3 me-5">
                            <Link className="brand d-flex gap-1 align-items-center" to="/">
                                <img src="/logo128.png" alt="logo" width="24" height="24" className="align-self-center"/>
                                XPlore
                            </Link>
                            <div className="description mt-4">Design amazing digital experiences that create more happy in the world.</div>
                        </div>
                        <div className="col">
                            <p className="col-title">About us</p>
                            <ul>
                                <li>Our story</li>
                                <li>Features</li>
                                <li>Pricing</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="col-title">Topics</p>
                            <ul>
                                <li>Lifestyle</li>
                                <li>Careers</li>
                                <li>Press</li>
                                <li>News</li>
                                <li>Media kit</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="col-title">Support</p>
                            <ul>
                                <li>Help centre</li>
                                <li>FAQs</li>
                                <li>Report</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="col-title">Contact</p>
                            <ul>
                                <li>Twitter</li>
                                <li>LinkedIn</li>
                                <li>Facebook</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                        <div className="col">
                            <p className="col-title">Legal</p>
                            <ul>
                                <li>Terms</li>
                                <li>Privacy</li>
                                <li>Licenses</li>
                                <li>Settings</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="container py-2">
                    <hr className="pb-2"/>
                    <p className="rights float-start">&copy; 2024 Xplore. All rights reserved.</p>
                    <i className="fa-brands fa-github float-end"></i>
                    <i className="fa-brands fa-facebook float-end me-3"></i>
                    <i className="fa-brands fa-linkedin float-end me-3"></i>
                    <i className="fa-brands fa-x-twitter float-end me-3"></i>
                </div>
            </div>
        </footer>
    )
}