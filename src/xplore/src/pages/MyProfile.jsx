import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import "../styles/commons.css";
import "./MyProfile.css";

import Avatar from '../components/avatar/Avatar';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"
import postPlaceholder from "../assets/images/post-placeholder.jpg"
import { formatToMD } from "../util/formatDate";
import { sanitizeContent } from "../util/formatText";

import { getPostByUser } from "../redux/actions/PostAction";
import { getUserFollowerAction, getUserFollowAction, getUserBlockAction } from "../redux/actions/UserAction";
import AuthorHorizontal from "../components/author-card/AuthorHorizontal"; 
import ButtonUnsubscribe from "../components/button/ButtonUnsubscribe";
import ButtonUnblock from "../components/button/ButtonUnblock";

const LONG_PASSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export default function MyProfile() {
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    console.log("user_info: ", user_info)

    const dispatch = useDispatch();
    const user_post = useSelector(state => state.PostReducer.posts);
    const user_follower = useSelector(state => state.UserReducer.user_follower);
    const user_follow = useSelector(state => state.UserReducer.user_follow);
    const user_block = useSelector(state => state.UserReducer.user_block);

    useEffect(() => {
        dispatch(getPostByUser(user_info.id_user))
        dispatch(getUserFollowerAction(user_info.id_user))
        dispatch(getUserFollowAction(user_info.id_user))
        dispatch(getUserBlockAction(user_info.id_user))

    }, [dispatch, user_info.id_user]);

    console.log("user_post: ", user_post)
    console.log("user_follower: ", user_follower)
    console.log("user_follow: ", user_follow)
    console.log("user_block: ", user_block)

    const followerCount = user_follower ? user_follower.length : 0;
    const followCount = user_follow ? user_follow.length : 0;
    const blockCount = user_block ? user_block.length : 0;

    const formatCount = (count) => {
        if (count >= 1000) {
            const kCount = Math.floor(count / 1000);
            const remainder = count % 1000;
            const formattedCount = remainder >= 100 ? kCount + '.' + Math.floor(remainder / 100) + 'K' : kCount + 'K';
            return formattedCount;
        } else {
            return count;
        }
    };
    
    const formattedFollowerCount = formatCount(followerCount);
    const formattedFollowCount = formatCount(followCount);
    const formattedBlockCount = formatCount(blockCount);

    const navigate = useNavigate();
    const handleAuthorClickWrapper = (follow) => {
        navigateToAuthorProfile(follow);
    };

    const navigateToAuthorProfile = (follow) => {
        navigate("/author-profile", { state: { author: follow } });
    };

    return (
        <div className='container-fluid profile'>
            <div className="profile-background"></div>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-center gap-3">
                    <img src={user_info.avatar || avatarPlaceholder} alt="user's avatar" className="avatar-ctn"/>
                    <div>
                        <h5 className="fullname">{user_info.fullname}</h5>
                        <p className="p2 email">{user_info.email}</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <a href='/edit-profile'>
                        <button className="btn-nm prim-btn button1">
                            <i className="fa-regular fa-pen-to-square me-1"></i> Edit profile
                        </button>
                    </a>
                    <button className="btn-nm tert-btn button1">
                        <i className="fa-solid fa-user-plus me-1"></i> Share profile
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-7 d-flex flex-column gap-2">
                        <h6>My posts</h6>
                        {user_post && user_post.length > 0 ? (
                            <div className='d-flex flex-column gap-2'>
                                {user_post.map((post) => (
                                <div className="blog-card-horizontal rounded-3 shadow-sm container d-flex bg-white">
                                    <div className="col-12 d-flex py-3 px-2">
                                        <div className="col-5 thumbnail-container bg-white h-100">
                                            <img src={post.thumbnail || postPlaceholder} alt=""  />
                                        </div>
                                    
                                        <div className="col-7 ps-4 d-flex flex-column justify-content-between">
                                            <div className="post-info-block">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {post.list_topic && post.list_topic?.length > 0 && (
                                                        <p className="subtitle2 text-scheme-primary p-0 m-0">
                                                            {`${post.list_topic[0]?.topic?.toUpperCase()}` || ""}
                                                        </p>
                                                    )}

                                                    <div className="dropdown" style={{marginLeft: "auto"}}>
                                                        <i className="fa-solid fa-ellipsis" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                        </i>

                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                                            <li><a className="dropdown-item" href="#">Edit post</a></li>
                                                            <li><a className="dropdown-item" href="#">Pin post</a></li>
                                                            <li><a className="dropdown-item" href="#">Settings</a></li>
                                                            <li><a className="dropdown-item" href="#">Stats</a></li>
                                                            <li><hr className="dropdown-divider"></hr></li>
                                                            <li><a className="dropdown-item delete-dropdown" href="#">
                                                                <i className="fa-regular fa-trash-can"></i> Delete Post
                                                            </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                            
                                                <div className="pt-2 mb-0">
                                                    <p className="title1 text-black title-text long-text">
                                                        {post.title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                                    </p>
                                                </div>
                                    
                                                <div className="pt-0 mt-0">
                                                    <p className="p3 text-scheme-sub-text long-text content-text"
                                                        dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) || LONG_PASSAGE }}>
                                                    </p>
                                                </div>
                                            </div>
                                                        
                                            <div className=" d-flex align-items-center pe-0 pt-2">
                                                <div className="col-9 d-flex align-items-center gap-2">
                                                    <div className="col-2">
                                                        <Avatar avatar={user_info?.avatar} size="small"/>
                                                    </div>
                                    
                                                    <div className="col-10 row d-flex align-items-center ">
                                                        <p className="title3 text-black mb-2">
                                                            {user_info?.fullname || "Author name"}
                                                        </p>
                                                        <div className="d-flex gap-2 text-scheme-sub-text align-items-center">
                                                            <p className="support mb-0">
                                                                {(post.publish_time && formatToMD(post.publish_time)) || "Aug 6"}
                                                            </p>
                                                            <p className="support mb-0">
                                                                <i className="fa-solid fa-message"></i>
                                                            </p>
                                                            <p className="support mb-0">
                                                                {post.responseCount || "000"}
                                                            </p>
                                                            <p className="support mb-0">
                                                                <i className="fa-solid fa-heart"></i>
                                                            </p>
                                                            <p className="support mb-0">
                                                                {post.likeCount || "000"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                    
                                                <div className="col-4 link-sm">
                                                    <a href={`/post?id_post=${post.id_post}`}>Read post <i className="fa-solid fa-arrow-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-box text-center my-5 py-5'>
                                <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                <h6 className='title2 text-scheme-sub-text mt-5'>You have 0 posts</h6>
                            </div>
                        )}
                    </div>
                    <div className="col-4 d-flex flex-column gap-2">
                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ marginRight: '10px'}}>
                            <h6>Following</h6>
                            <p className="p1">{formattedFollowCount} users</p>
                        </div>
                        {user_follow && user_follow.length > 0 ? (
                            <div className='d-flex flex-column gap-2 pb-2 mb-3' style={{ maxHeight: '520px', overflowY: 'auto' }}>
                                {user_follow.map((follow) => (
                                    <div className="author-horizontal row py-3 pe-3 d-flex bg-white rounded-3 shadow-sm overflow-hidden w-100" onClick={() => handleAuthorClickWrapper(follow)} style={{ cursor: 'pointer' }}>
                                        <div className=" col-2 d-flex align-items-start justify-content-center ">
                                            <Avatar avatar={follow.avatar} size="small"/>
                                        </div>
                            
                                        <div className=" col-6 d-flex flex-wrap px-0 mx-0">
                                            <p className="button2 m-0">{follow.fullname}</p>
                                            <div className="p3 m-0 mt-2 long-text text-scheme-sub-text">{follow.bio}</div>
                                        </div>
                            
                                        <div className=" col-4 d-flex align-items-center justify-content-center px-0 mx-0">
                                            <ButtonUnsubscribe user={follow.id_user} subscriber={user_info.id_user}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p></p>
                        )}

                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ marginRight: '10px'}}>
                            <h6>Followers</h6>
                            <p className="p1">{formattedFollowerCount} users</p>
                        </div>
                        {user_follower && user_follower.length > 0 ? (
                            <div className='d-flex flex-column gap-2 pb-2 mb-3' style={{ maxHeight: '520px', overflowY: 'auto' }}>
                                {user_follower.map((follower) => (
                                    <AuthorHorizontal key={follower.id} author={follower} />
                                ))}
                            </div>
                        ) : (
                            <p></p>
                        )}

                        <div className="d-flex flex-row justify-content-between align-items-center" style={{ marginRight: '10px'}}>
                            <h6>Block</h6>
                            <p className="p1">{formattedBlockCount} users</p>
                        </div>
                        {user_block && user_block.length > 0 ? (
                            <div className='d-flex flex-column gap-2 pb-2 mb-3' style={{ maxHeight: '520px', overflowY: 'auto' }} >
                                {user_block.map((block) => (
                                    <div className="author-horizontal row py-3 pe-3 d-flex bg-white rounded-3 shadow-sm overflow-hidden w-100">
                                        <div className=" col-2 d-flex align-items-start justify-content-center ">
                                            <Avatar avatar={block.avatar} size="small"/>
                                        </div>
                            
                                        <div className=" col-6 d-flex flex-wrap px-0 mx-0">
                                            <p className="button2 m-0">{block.fullname}</p>
                                            <div className="p3 m-0 mt-2 long-text text-scheme-sub-text">{block.bio}</div>
                                        </div>
                            
                                        <div className=" col-4 d-flex align-items-center justify-content-center px-0 mx-0">
                                            <ButtonUnblock user={user_info.id_user} block={block.id_user}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}