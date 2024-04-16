import React, { useState, useEffect } from 'react';

import "../styles/commons.css";
import "./EditProfile.css";

import Avatar from '../components/avatar/Avatar';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';

export default function EditProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-4 d-flex flex-column gap-2">
                        <h6>Personal info</h6>
                        <p>Update your photo and personal details.</p>
                    </div>
                    <div className="col-7 d-flex flex-column gap-2">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-4 avatar-con">
                                    <img src={avatarPlaceholder} alt="user's avatar" className="avatar"/>
                                </div>
                                <div className="col-7 d-flex">
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
                            <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                                <a href='/my-profile'>
                                    <button className="btn-nm tert-btn button1 edit-style">
                                        Cancel
                                    </button>
                                </a>
                                <button type='submit' className="btn-nm prim-btn button1 edit-style">
                                    Save changes
                                </button>
                            </div>
                        </form>
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