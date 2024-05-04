import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "../styles/commons.css";
import "./LoginPopup.css"
import { loginAction } from "../redux/actions/UserAction";
import { DOMAIN } from "../util/config";
import Loading from '../components/system-feedback/Loading';

export default function LoginPopup(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        let isValid = true;

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError("Please enter your email!");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Please enter your password!");
            isValid = false;
        }

        if(password.length < 8){
            setPasswordError("Passwords is too short. Please try again!");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const user_login = {
            email: email,
            password: password
        };
        console.log("user_login: ", user_login);

        setLoading(true);
        try {
            const result = await dispatch(loginAction(user_login));
            
            if (result?.status === 200 && result?.data.message === "Login successfully") {
                setLoading(false);
            } else {
                alert("Email or password wrong");
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            console.log("error", error.message);
        }
        
    }

    function handleSigninWithGoogle() {
        window.location.href = `${DOMAIN}/auth/google`;
    }

    
    const handleNavigate = () => {
        navigate("/", { state: { signup: true, check: true } });
    };
      
    return (
        <div className="login-popup-overlay">
            <div className="login-popup">
                {loading ? (
                    <Loading/>
                ):(
                    <>
                        <i className="fa-solid fa-xmark close-button" onClick={props.toggle}></i>
                        <div>
                            <div className="navbar-brand-login">
                                <img src="/logo128.png" alt="logo" width="22" height="22" className="align-self-center"/>
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
                                {emailError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px" }}>{emailError}</div>}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                                {passwordError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px" }}>{passwordError}</div>}
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
                        <button type="button" className="btn-sign-in-google" onClick={handleSigninWithGoogle}>
                            <img src="/search.png" alt="google" style={{ marginRight: "10px" }}/>
                            Sign in with Google
                        </button>

                        <div className="sign-up">Don't have an account? 
                            <span onClick={() => handleNavigate()} style={{color: "var(--scheme-primary)", cursor: "pointer", fontWeight: "600"}}> Sign up</span>
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
};