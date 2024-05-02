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

export default function Home() {

    return (
        <div>
            {/* Search bar */}
            <Search />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row gap-2'>
                        <div className='col-6'>
                            <MyTabs />
                        </div>
                        <div className='col'></div>
                    </div>
                </div>
            </div>
        </div>
    )
};