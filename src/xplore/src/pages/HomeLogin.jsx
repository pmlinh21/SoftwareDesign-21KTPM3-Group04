import React from 'react';
import "../styles/commons.css";
import "./SearchResult.css"
import Search from '../components/search/Search'
import TopicTag from '../components/topic/TopicTag'

import { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux'
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/loading/Loading';

function HomeLogin() {
    return (
        <div>
            {/* Search bar */}
            <Search search="" isResult={false} />

            <div className="container-fluid">
                <div className="container">
                    <div className="row g-4">
                        {/* Tab bar */}
                        <div className="col-6">
                            <img src={WhoWeAre} alt=""/>
                        </div>
                        {/* Trending */}
                        {/* Following */}
                        {/* Topics */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeLogin;

