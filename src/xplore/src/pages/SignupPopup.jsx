import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../styles/commons.css";
import "./SignupPopup.css"
import { signupAction } from "../redux/actions/UserAction";
import { RoleKey } from "../util/config";
export default function SignupPopup(props) {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const roleId = localStorage.getItem(RoleKey);
    const [showNotification, setShowNotification] = useState(false);

    function handleSignup(e) {
        e.preventDefault()
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!fullname){
            alert("Fullname is empty. Please try again!!!");
            return;
        }
        if(password.length >= 8 && regex.test(email)){
            const user_signup = {
                fullname: fullname,
                email: email,
                password: password,
                id_role: roleId
            };
            console.log("user_signup: ", user_signup);
            dispatch(signupAction(user_signup));
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
        }
        else if (!regex.test(email)){
            alert("Email is invalid. Please try again!!!");
            return;
        }
        else if (password.length < 8){
            alert("Passwords is too short. Please try again!!!");
            return;
        }
        
        // Clear form fields after signup
        setFullname('');
        setEmail('');
        setPassword('');
    }
      
    return (
        <div className="signup-popup-overlay">
            <div className="signup-popup">
                <i class="fa-solid fa-xmark close-button" onClick={props.toggle}></i>
                <div>
                    <div className="navbar-brand">
                        <img src="/logo128.png" alt="logo" width="22" height="22" className="align-self-center"/>
                        <br></br>
                        Xplore
                    </div>
                    
                    <h2>Create an account</h2>
                    <p>Welcome! Let's begin the journey with Xplore.</p>
                </div>
                
                <form onSubmit={handleSignup}>
                <div className="form-group">
                        <label>Full name</label>
                        <input type="text" placeholder="Enter your full name" value={fullname} onChange={e => setFullname(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                        <p className="hint">Must be at least 8 characters.</p>
                    </div>

                    {/* <div className="form-row">
                        <div className="checkbox">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember for 30 days</label>
                        </div>

                        <div className="forgot-password"><a href="#">Forgot password</a></div>
                    </div> */}

                    <button type="submit" className="btn-sign-up">Sign up</button>
                </form>
                <button type="button" className="btn-sign-up-google">
                    <img src="/search.png" alt="google" style={{ marginRight: "10px" }}/>
                    Sign up with Google
                </button>

                <div className="sign-in">Already have an account? 
                    <a href="#"> Sign in</a>
                </div>
                {showNotification && <div style={{color: "#004EEA", fontStyle: "italic", fontFamily: "medium-font", marginTop: "10px"}}>Signup successful!!!</div>}
            </div>
        </div>
    );
};