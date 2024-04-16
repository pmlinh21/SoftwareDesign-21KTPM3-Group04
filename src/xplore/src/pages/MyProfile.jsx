import React, { useState, useEffect } from 'react';

import "../styles/commons.css";
import "./MyProfile.css";

import Avatar from '../components/avatar/Avatar';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogPostCard from '../components/blog-card/BlogPostCard';
import ProfileCard from '../components/blog-card/ProfileCard';

let props = {
    id_post: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail: `https://picsum.photos/id/2/600/600`,
    list_topic: "First topic",
    author: "Author name",
    publish_time: "2021-09-01",
    is_saved: true
}

export default function MyProfile() {
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
                    <a href='/edit-profile'>
                        <button className="btn-nm prim-btn button1">
                            <i class="fa-regular fa-pen-to-square me-1"></i> Edit profile
                        </button>
                    </a>
                    <button className="btn-nm tert-btn button1">
                        <i class="fa-solid fa-user-plus me-1"></i> Share profile
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-7 d-flex flex-column gap-2">
                        <h6>Posted</h6>
                        <ProfileCard {...props}/>
                        <ProfileCard {...props}/>
                        <ProfileCard {...props}/>
                    </div>
                    <div className="col-4 d-flex flex-column gap-2">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h6>Following</h6>
                            <p className="p1">120</p>
                        </div>
                        <AuthorHorizontal />
                        <AuthorHorizontal />
                        <button className="link-nm button1 d-flex justify-content-start gap-1 align-items-center mt-2">
                            See all <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}