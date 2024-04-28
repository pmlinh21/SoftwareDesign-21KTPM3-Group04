import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/commons.css";
import "./AuthorProfile.css";
import { getAuthorPostAction, getAuthorSubscriberAction } from "../redux/actions/UserAction";
import ProfileCard from '../components/blog-card/ProfileCard';

let props = {}

export default function AuthorProfile() {
    const location = useLocation();
    const author = location.state.author;

    const dispatch = useDispatch();
    const author_post = useSelector(state => state.UserReducer.author_post);
    const author_subscriber = useSelector(state => state.UserReducer.author_subscriber);

    const { id_user, avatar, fullname, email } = author;

    useEffect(() => {
        dispatch(getAuthorPostAction(id_user));

        dispatch(getAuthorSubscriberAction(id_user));
    }, [dispatch, id_user]);

    console.log("author_post: ", author_post)
    console.log("author_subscriber: ", author_subscriber)

    const postCount = author_post ? author_post.length : 0;
    const subscriberCount = author_subscriber ? author_subscriber.length : 0;

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
    
    const formattedPostCount = formatCount(postCount);
    const formattedSubscriberCount = formatCount(subscriberCount);

    const [activeTab, setActiveTab] = useState('posts');

    return (
        <div className='container-fluid profile'>
            <div className="profile-background"></div>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-center gap-3">
                    <img src={avatar} alt="user's avatar" className="avatar-ctn"/>
                    <div>
                        <h5 className="fullname">{fullname}</h5>
                        <p className="p2 email">{email}</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <a href='/edit-profile'>
                        <button className="btn-nm prim-btn button1">Follow</button>
                    </a>
                    <button className="btn-nm tert-btn button1">
                        <i className="fa-solid fa-user-plus me-1"></i> Share profile
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-7 d-flex flex-column gap-2">
                        <div className="row">
                            <div className="col">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item" style={{ width: "50%" }}>
                                        <button className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Posts</button>
                                    </li>
                                    <li className="nav-item" style={{ width: "50%" }}>
                                        <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>List</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="tab-content">
                                <div id="posts" className={`tab-pane fade ${activeTab === 'posts' ? 'show active' : ''}`}>
                                    <div className="d-flex flex-column gap-2">
                                        {author_post && author_post.map((post, index) => (
                                            <ProfileCard key={index} {...props} />
                                        ))}
                                    </div>
                                </div>
                                <div id="list" className={`tab-pane fade ${activeTab === 'list' ? 'show active' : ''}`}>
                                    <div className="d-flex flex-column gap-2">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-4 d-flex flex-column gap-2">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h6>About</h6>
                            <div>
                                <span className="p2" style={{marginRight: "15px"}}>{formattedPostCount} posts</span>
                                <span className="p2">{formattedSubscriberCount} followers</span>
                            </div>
                        </div>
                        <p className="p1">
                            I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
                        </p>
                        <div className="tip-section">
                            <p className="p1" style={{fontWeight: "600"}}>Enjoy the read? Reward the writer!</p>
                            <p className="p2">Your tip will go to Olivia through a third-party platform of their choice.</p>
                            <button className="tip-button">
                                <i className="fa-solid fa-hand-holding-heart" style={{marginRight: "8px"}}></i>Give a tip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}