import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./AuthorProfile.css";
import { getAuthorPostAction, getAuthorSubscriberAction, getAuthorListAction, isFollowAuthorAction,
        unfollowAuthorAction, followAuthorAction, blockAuthorAction } from "../redux/actions/UserAction";
import ProfileCard from '../components/blog-card/ProfileCard';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"

let props = {}

export default function AuthorProfile() {
    const location = useLocation();
    const author = location.state.author;
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const author_post = useSelector(state => state.UserReducer.author_post);
    const author_subscriber = useSelector(state => state.UserReducer.author_subscriber);
    const author_list = useSelector(state => state.UserReducer.author_list);
    const is_follow = useSelector(state => state.UserReducer.is_follow);
    const block = useSelector(state => state.UserReducer.block);

    const { id_user, avatar, fullname, email, bio, tipping_link } = author;

    const user_login = useSelector(state => state.UserReducer.user_login);
     
    useEffect(() => {
        dispatch(getAuthorPostAction(id_user));

        dispatch(getAuthorSubscriberAction(id_user));

        dispatch(getAuthorListAction(id_user));

        dispatch(isFollowAuthorAction(id_user, user_login.id_user));

    }, [dispatch, id_user]);

    console.log("author_post: ", author_post)
    console.log("author_subscriber: ", author_subscriber)
    console.log("author_list: ", author_list)
    console.log("is_follow: ", is_follow)
    console.log("block: ", block)

    var filteredAuthorPost;

    if(author_post && author_post.length > 0){
        const currentTime = new Date().getTime();
        filteredAuthorPost = author_post.filter(post => new Date(post.publish_time).getTime() <= currentTime);
        console.log("filteredAuthorPost: ", filteredAuthorPost)
    }
    else{
        filteredAuthorPost = author_post
    }
    const postCount = filteredAuthorPost ? filteredAuthorPost.length : 0;
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

    const [tab, setTab] = useState('posts');

    const handleFollow = () => {
        if (is_follow) {
            dispatch(unfollowAuthorAction(id_user, user_login.id_user));
        } else {
            dispatch(followAuthorAction(id_user, user_login.id_user, fullname));
        }
    };

    const handleBlock = async () => {
        try {
            const result = await dispatch(blockAuthorAction(user_login.id_user, id_user));
            if (result.status === 200 && result.data.message === "Block successfully") {
                alert("Block successfully");
                navigate("/");
            } else {
                alert("Failed to block author");
            }
        } catch (error) {
            console.log("error", error);
            alert("An error occurred while blocking the author");
        }
    }

    const [showTipBox, setShowTipBox] = useState(false);

    const handleTipButtonClick = () => {
        setShowTipBox(true);
    };

    const handleTipBoxClose = () => {
        setShowTipBox(false);
    };

    return (
        <div className='container-fluid profile'>
            <div className="profile-background"></div>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-center gap-3">
                    <img src={avatar || avatarPlaceholder} alt="user's avatar" className="avatar-ctn"/>
                    <div>
                        <h5 className="fullname">{fullname}</h5>
                        <p className="p2 email">{email}</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <button className={`btn-nm prim-btn button1 ${is_follow ? 'btn-unfollow' : 'btn-follow'}`} onClick={handleFollow}>
                            {is_follow ? 'Unfollow' : 'Follow'}
                    </button>
                    <button className="btn-nm tert-btn button1" onClick={handleBlock}>
                        <i className="fa-solid fa-ban me-1"></i> Block
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-7 d-flex flex-column gap-2">
                        <ul className='row tab-panel my-4'>
                            <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'posts' ? 'focused' : ''}`} id="for-posts" onClick={() => setTab('posts')}>Posts</li>
                            <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'list' ? 'focused' : ''}`} id="for-list" onClick={() => setTab('list')}>List</li>
                        </ul>

                        <div className='tab-content' id='posts' style={{ display: tab === 'posts' ? 'block' : 'none' }}>
                            <div className='d-flex flex-column gap-2'>
                                {filteredAuthorPost && filteredAuthorPost.length > 0 ? (
                                    <div className='d-flex flex-column gap-2'>
                                        {filteredAuthorPost.map((post, index) => (
                                            <ProfileCard key={index} {...props} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className='empty-box text-center my-5 py-5'>
                                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                        <h6 className='title2 text-scheme-sub-text mt-5'>Author has 0 posts</h6>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='tab-content' id='list' style={{ display: tab === 'list' ? 'block' : 'none' }}>
                            <div className='d-flex flex-column gap-2'>
                                {author_list && author_list.length > 0 ? (
                                    <div className='d-flex flex-column gap-2'>
                                        {author_list.map((list, index) => (
                                            <div className='list-card-content p-4 shadow row mb-3'>
                                                <div className='d-flex flex-column justify-content-between info-list'>
                                                    <div className="d-flex flex-column justify-content-start">
                                                        <div className="d-flex flex-row justify-content-start">
                                                            <img src={author?.avatar || "./imgs/avatar-placeholder.jpg"} alt="user's avatar" className="avatar" />
                                                            <p className="p1 user-name ms-1">{author?.fullname || "Fullname"}</p>
                                                        </div>
                                                        <h6 className="text-scheme-main-text">{list?.list_name || "List name"}</h6>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center">
                                                        <p className="p1 post-count my-auto">{list?.saved_posts.length || "000"} posts</p>
                                                        <i className="fa-regular fa-share-from-square ms-3 ic mt-1"></i>
                                                    </div>
                                                </div>

                                                <div className="thumbnail-container-list">
                                                    <img src={list.saved_posts[0]?.thumbnail || avatarPlaceholder} alt="post thumbnail" className="first" />
                                                    <img src={list.saved_posts[1]?.thumbnail || avatarPlaceholder} alt="post thumbnail" className="second" />
                                                    <img src={list.saved_posts[2]?.thumbnail || avatarPlaceholder} alt="post thumbnail" className="third" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='empty-box text-center my-5 py-5'>
                                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                        <h6 className='title2 text-scheme-sub-text mt-5'>Author has 0 lists</h6>
                                    </div>
                                )}
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
                            {bio}
                        </p>
                        <div className="tip-section">
                            <p className="p1" style={{fontWeight: "600"}}>Enjoy the read? Reward the writer!</p>
                            <p className="p2">Your tip will go to {fullname.split(" ")[0]} through a third-party platform of their choice.</p>
                            <button className="tip-button" onClick={handleTipButtonClick}>
                                <i className="fa-solid fa-hand-holding-heart" style={{marginRight: "8px"}}></i>Give a tip
                            </button>
                        </div>

                        {showTipBox && (
                            <div className="tip-box">
                                <button className="close-btn" onClick={handleTipBoxClose}>
                                    <i className="fa-solid fa-times"></i>
                                </button>
                                {tipping_link ? (
                                    <img src={tipping_link} alt="Tip Image" className="tip-image" />
                                ) : (
                                    <p className="tip-message">Author has not tipping link yet</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}