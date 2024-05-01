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
    const [Topics, setTopics] = useState([]);
    const [Post, setPost] = useState([]);

    const fetchTopics = async () => {
        try {
            const topics = [];
            const result = await topicService.getAllTopics();
            for (let i = 0; i < result.data.content.length; i++) {
                topics.push(result.data.content[i]);
            }
            setTopics(topics);
        }
        catch (error) {
            console.log("error", error.response);
        }
    }

    const fetchPost = async () => {
        try {
            const postId = [];
            const post = await postService.getPostById(postId);
            setPost(post);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    useEffect(() => {
        fetchTopics();
        fetchPost();
    }, []);

    console.log("Topics", Topics);

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
                            <h4>The 2024 Software Architect or Solution Architect RoadMap</h4>
                            {/* Post Description */}
                            <p className='description'>An illustrated guide to becoming a Software Architect in 2024 with links to relevant courses</p>
                            {/* Post Topics */}
                            <div className="d-flex flex-wrap gap-2">
                                {Topics.map(topic => (
                                    <button key={topic.id} className="topic label2 capitalize">{topic.topic}</button>
                                ))}
                            </div>
                        </div>
                        <div className='col-2'></div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Post;