import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import Search from '../components/search/Search'

import "../styles/commons.css";
import "./PostDetail.css";
import "./SearchResult.css"

import { getPostByUser, createPostAction, updatePostAction } from "../redux/actions/PostAction";
import {postService} from '../services/PostService';
import {topicService} from '../services/TopicService';

function Post() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id_post = parseInt(searchParams.get('id_post'));

    const [Topics, setTopics] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const post = await postService.getPostById(id_post);
            setPost(post.data.content);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    console.log("Topics", Topics);
    console.log("Post", Post);

    return (
        <div>
            {/* Search bar */}
            <Search search="" isResult={false} />
            {/* Post Detail */}
            <div className='container-fluid' style={{marginTop: '72px'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            {/* Post Title */}
                            <h4 style={{marginBottom: '1rem'}}>{post?.title}</h4>
                            {/* Post Description */}
                            <p className='description'>An illustrated guide to becoming a Software Architect in 2024 with links to relevant courses</p>
                            {/* Post Topics */}
                            <div className="d-flex flex-wrap gap-2">
                                {/* {Topics.map(topic => (
                                    <button key={topic.id} className="topic label2 capitalize">{topic.topic}</button>
                                ))} */}
                                <button className='topic label 2'>Business</button>
                            </div>
                            {/* Post Authors */}
                            <hr/>
                            <div className='d-flex' style={{gap: '16px', padding: '24px 0'}}>
                                {/* Avatar */}
                                <img src="/imgs/Avatar-6.svg" style={{height: '44px', width: '44px'}} />
                                {/* Name */}
                                <div className='d-flex flex-column'>
                                    <p className='support' style={{color: 'var(--scheme-sub-text)', marginBottom: '8px' }}>Posted by</p>
                                    <p className='label1' style={{margin: '0', color: 'var(--scheme-text)' }}>Oliver Knight</p>
                                </div>
                                {/* Date */}
                                <div className='d-flex flex-column'>
                                    <p className='support' style={{ color: 'var(--scheme-sub-text)', marginBottom: '8px' }}>Date posted</p>
                                    <p className='label1' style={{margin: '0', color: 'var(--scheme-text)' }}>July 14, 2023</p>
                                </div>
                                <button className='prim-btn btn-sm' style={{width: '117px'}}>Follow</button>
                                {/* Post Actions */}
                                <div className='d-flex gap-2' style={{margin: '0 0 0 14.8rem'}}>
                                    <button id='like-btn'>
                                        <i className="fa-regular fa-heart" style={{fontSize: '20px'}}></i> 115
                                    </button>
                                    <button id='comment-btn'>
                                        <i className="fa-regular fa-message" style={{fontSize: '20px'}}></i> 24
                                    </button>
                                    <button id='save-btn'>
                                        <i className="fa-regular fa-bookmark" style={{fontSize: '20px'}}></i>
                                    </button>
                                    <button id='share-btn'>
                                        <i className="fa-regular fa-share-from-square" style={{fontSize: '20px'}}></i>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div className='col-2'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;