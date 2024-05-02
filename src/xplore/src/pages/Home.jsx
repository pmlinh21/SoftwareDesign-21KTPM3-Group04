import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import "./Home.css"
import "../styles/commons.css";
import "./SearchResult.css"

import Search from '../components/search/Search'
import MyTabs from './MyTabs';
import { topicService } from "../services/TopicService"
import { postService } from '../services/PostService'
import { getAllTopicsAction } from '../redux/actions/TopicAction';

import AuthorHorizontal from '../components/author-card/AuthorHorizontal'
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import BlogCardNoThumb from '../components/blog-card/BlogCardNoThumb';

export default function Home() {
    const [trendingPosts, setTrendingPosts] = useState([]);

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

    useEffect(() => {
        fetchTrendingPosts();
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
                        <div className='col-7'>
                            <MyTabs />
                        </div>
                        <div className='col-4'>
                            <h6><i className="fa-solid fa-chart-line"></i> Trending on Xplore</h6>
                            {topHalfOfPosts.map((post, index) => (
                                <div className='my-3' key={post.id_post}>
                                    <BlogCardNoThumb post={post}/>
                                </div>
                            ))}
                            {bottomHalfOfPosts.map((post, index) => (
                                <div className='my-3' key={post.id_post}>
                                    <BlogCardNoThumb  post={post}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};