import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Search from '../components/search/Search'
import MyTabs from './MyTabs'

import "./Home.css"
import "../styles/commons.css"
import "./SearchResult.css"

import {postService} from '../services/PostService';
import {userService} from '../services/UserService';
import {topicService} from '../services/TopicService';
import { getAllTopicsAction } from '../redux/actions/TopicAction'

import AuthorHorizontal from '../components/author-card/AuthorHorizontal'
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import BlogCardNoThumb from '../components/blog-card/BlogCardNoThumb'

export default function Home() {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [Authors, setAuthors] = useState([]);
    const authorsToFollow = Authors.slice(5, 10);

    const fetchTrendingPosts = async () => {
        try {
            const result = await postService.getTrendingPosts();
            if (result.status === 200) {
                setTrendingPosts(result.data.content);
            }
        } catch (error) {
            console.log("error", error.response);
            // alert(error.response.data.message)
        }
    };

    const fetchAuthors = async () => {
        try {
            const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const users = [];
            for (let i = 0; i < ids.length; i++) {
                const result = await userService.getUserById(ids[i]);
                if (result.status === 200) {
                    users.push(result.data.content);
                }
            }
            setAuthors(users);
        } catch (error) {
            console.log("error", error.response);
        }
    }

    useEffect(() => {
        fetchTrendingPosts();
        fetchAuthors();
    }, []);

    console.log("trendingPosts", trendingPosts.length);

    const topHalfOfPosts = trendingPosts.slice(0, trendingPosts.length / 2);
    const bottomHalfOfPosts = trendingPosts.slice(trendingPosts.length / 2, trendingPosts.length);

    return (
        <div>
            {/* Search bar */}
            <Search />
            <div className='container-fluid'>
                <div className='container my-5'>
                    <div className='row gap-5 justify-content-between'>
                        {/* Tabs */}
                        <div className='col-7'>
                            <MyTabs />
                        </div>
                        {/* Trending */}
                        <div className='col-4 d-flex flex-column gap-3'>
                            <h6><i className="fa-solid fa-chart-line"></i> Trending on Xplore</h6>
                            {topHalfOfPosts.map((post, index) => (
                                <div key={post.id_post}>
                                    <BlogCardNoThumb post={post}/>
                                </div>
                            ))}
                            {bottomHalfOfPosts.map((post, index) => (
                                <div key={post.id_post}>
                                    <BlogCardNoThumb  post={post}/>
                                </div>
                            ))}
                            {/* Following */}
                            <h6 className='my-4'>Who to follow</h6>
                            {authorsToFollow.map(author => (
                                <AuthorHorizontal author={author} key={author.id_user}/>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
};