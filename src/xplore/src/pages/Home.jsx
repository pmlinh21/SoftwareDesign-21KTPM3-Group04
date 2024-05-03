import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Search from '../components/search/Search'
import MyTabs from './MyTabs'
import TopicTag from '../components/topic/TopicTag';
import Loading from '../components/system-feedback/Loading';

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
    const navigate = useNavigate();
    const {user_login} = useSelector(state => state.UserReducer);
    const {loading} = useSelector(state => state.LoadingReducer);
    const [trendingPosts, setTrendingPosts] = useState(null);
    const [Authors, setAuthors] = useState(null);
    const [hotTopics, setHotTopics] = useState(null);

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
            const ids = [1, 2, 3, 4, 5]
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

    const fetchHotTopics = async () => {
        try {
            const topics = [];
            const result = await topicService.getAllTopics();
            for (let i = 0; i < result.data.content.length; i++) {
                topics.push(result.data.content[i]);
            }
            setHotTopics(topics);
        }
        catch (error) {
            console.log("error", error.response);
            // alert(error.response.data.message)
        }
    }

    useEffect(() => {
        // console.log("*")
        if (!user_login.id_user){
            console.log("home ")
            navigate("/")
            return
        }
        if (trendingPosts == null)
            fetchTrendingPosts();
        if (Authors == null)
            fetchAuthors();
        if (hotTopics == null)
            fetchHotTopics();
    }, [user_login.id_user]);

    // console.log("trendingPosts", trendingPosts?.length);

    const topHalfOfPosts = trendingPosts?.slice(0, trendingPosts?.length / 2);
    const bottomHalfOfPosts = trendingPosts?.slice(trendingPosts?.length / 2, trendingPosts?.length);

    return (
        <div>
            {/* Search bar */}
            <Search />
            {
                loading ? <Loading/> : (
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
                                {topHalfOfPosts?.map((post, index) => (
                                    <div key={post.id_post}>
                                        <BlogCardNoThumb post={post}/>
                                    </div>
                                ))}
                                {bottomHalfOfPosts?.map((post, index) => (
                                    <div key={post.id_post}>
                                        <BlogCardNoThumb  post={post}/>
                                    </div>
                                ))}
                                {/* Following */}
                                <h6 className='my-4'>Who to follow</h6>
                                {Authors?.map(author => (
                                    <AuthorHorizontal author={author} key={author.id_user}/>
                                ))}
                                {/* Topics */}
                                <h6 className='my-4'>Topics to follow</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {hotTopics?.map(topic => (
                                        <TopicTag key={topic.topic} topic={topic} />
                                    ))}
                                </div>
                                <button className="link-nm button1 d-flex justify-content-start gap-1 align-items-center mt-4">
                                    See all<i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                )
            }
            
        </div>
    )
};