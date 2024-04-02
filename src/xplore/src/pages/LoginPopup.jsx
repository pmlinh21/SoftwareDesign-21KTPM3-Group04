import React, { useState } from 'react';
import "../styles/commons.css";
import "./LoginPopup.css"

export default function LoginPopup(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        props.toggle()
    }
      
    return (
        <div className="login-popup-overlay">
            <div className="login-popup">
                <i class="fa-solid fa-xmark close-button" onClick={props.toggle}></i>
                <div>
                    <div className="navbar-brand">
                        <img src="/logo128.png" alt="logo" width="30" height="30" className="align-self-center"/>
                        <br></br>
                        Xplore
                    </div>
                    
                    <h2>Log in to your account</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <div className="checkbox">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember for 30 days</label>
                        </div>

                        <div className="forgot-password"><a href="#">Forgot password</a></div>
                    </div>

                    <button type="submit" className="btn-sign-in">Sign in</button>
                </form>
                <button type="button" className="btn-sign-in-google">
                    <img src="/search.png" alt="google" style={{ marginRight: "10px" }}/>
                    Sign in with Google
                </button>

                <div className="sign-up">Don't have an account? 
                    <a href="#"> Sign up</a>
                </div>
            </div>
        </div>
    );
};