import React, { useEffect,useState } from 'react';
import './Library.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/search/Search';
import { getPostByUser } from "../redux/actions/PostAction";
import BlogPostCard from '../components/blog-card/BlogPostCard';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"

let props = {}
export default function Library(props) {
    const dispatch = useDispatch();
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    console.log("user_info: ", user_info)
    
    const author = {
        fullname: user_info.fullname, 
        avatar: user_info.avatar,
        id_user: user_info.id_user
    }
    
    const [tab, setTab] = useState('drafts');

    const user_post = useSelector(state => state.PostReducer.posts);

    useEffect(() => {
        dispatch(getPostByUser(author.id_user))

    }, [dispatch, author.id_user]);

    console.log("user_post: ", user_post)

    var draft_post;
    var published_post;

    if(user_post && user_post.length > 0){
        const currentTime = new Date().getTime();
        draft_post = user_post.filter(post => new Date(post.publish_time).getTime() > currentTime);
        
        published_post = user_post.filter(post => new Date(post.publish_time).getTime() <= currentTime);
        
        console.log("draft_post: ", draft_post)
        console.log("published_post: ", published_post)
    }
    else{
        draft_post = user_post
        published_post = user_post
    }
    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'drafts' ? 'focused' : ''}`} id="for-drafts" onClick={() => setTab('drafts')}>Drafts</li>
                    <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'published' ? 'focused' : ''}`} id="for-published" onClick={() => setTab('published')}>Published</li>
                </ul>
                <div className='tab-content' id='drafts' style={{ display: tab === 'drafts' ? 'block' : 'none' }}>
                    <div className='d-flex flex-column gap-2'>
                        {draft_post && draft_post.length > 0 ? (
                            <div className="list-post row row-cols-3 gap-4">
                                {draft_post.map((post) => (
                                    <BlogPostCard key={post.id_post} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty-box text-center my-5 py-5'>
                                <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                <h6 className='title2 text-scheme-sub-text mt-5'>You have 0 posts</h6>
                            </div>
                        )}
                    </div>
                </div>

                <div className='tab-content' id='published' style={{ display: tab === 'published' ? 'block' : 'none' }}>
                    <div className='d-flex flex-column gap-2'>
                        {published_post && published_post.length > 0 ? (
                            <div className="list-post row row-cols-3 gap-4">
                                {published_post.map((post) => (
                                    <BlogPostCard key={post.id_post} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty-box text-center my-5 py-5'>
                                <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                <h6 className='title2 text-scheme-sub-text mt-5'>You have 0 posts</h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
)};
