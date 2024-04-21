import React, { useState, useEffect } from 'react';

import "../styles/commons.css";
import "./EditProfile.css";

import Avatar from '../components/avatar/Avatar';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';

export default function EditProfile() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
    };
    return (
        <div className='container-fluid profile'>
            <div className="profile-background"></div>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-center gap-3">
                    <img src={avatarPlaceholder} alt="user's avatar" className="avatar-ctn"/>
                    <div>
                        <h5 className="fullname">John Doe</h5>
                        <p className="p2 email">johndoe@gmail.com</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <a href='/my-profile'>
                        <button className="btn-nm tert-btn button1">
                            Cancel
                        </button>
                    </a>
                    <button className="btn-nm prim-btn button1">
                        Save changes
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-center">
                    <div className="col-4 d-flex flex-column gap-2">
                        <h6>Personal info</h6>
                        <p>Update your photo and personal details.</p>
                    </div>
                    <div className="col-8 d-flex flex-column gap-2 p-4 form-info rounded-3 shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="col">
                                    <label htmlFor="fullName" className="form-label">Full name</label>
                                    <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                                    <input type="text" className="form-control" id="birthdate" value="22/03/2003" readOnly />
                                </div>
                                <div className="col">
                                    <label htmlFor="phone" className="form-label">Phone number</label>
                                    <input type="text" className="form-control" id="phone" value="+84 855 995 203" readOnly />
                                </div>
                                <div className="col">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <div className='row select-gender'>
                                        <div className="col form-check">
                                            <input className="form-check-input" type="radio" name="gender" id="male" checked />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="col form-check">
                                            <input className="form-check-input" type="radio" name="gender" id="female" />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 mt-4 justify-content-center">
                                <div className="col-4 avatar-con">
                                    <img src={avatarPlaceholder} alt="user's avatar" className="avatar"/>
                                </div>
                                <div className="col-7 d-flex rounded-3 shadow-sm justify-content-center">
                                    <label htmlFor="photo" className="form-label upload-label">
                                        <input type="file" className="form-control visually-hidden" id="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                                        <div className="upload-icon">
                                            <i className="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <div className="upload-text">
                                            <span>Click to upload or drag and drop</span>
                                            <span>(SVG, PNG, JPG or GIF max. 800x400px)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                            <a href='/my-profile'>
                                <button className="btn-nm tert-btn button1 edit-style">Cancel</button>
                            </a>
                            <button className="btn-nm prim-btn button1 edit-style">Save changes</button>
                        </div>
                    </div>
                </div>
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-4 d-flex flex-column gap-2">
                        <h6>Profile</h6>
                        <p>Update your portfolio and bio.</p>
                    </div>
                    <div className="col-7 d-flex flex-column gap-2">
                    
                    </div>
                </div>
            </div>
        </div>
    )
}