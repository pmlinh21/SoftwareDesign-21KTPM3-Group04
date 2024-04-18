import React from 'react';
import "../styles/commons.css";
import "./HomeLogin.css"
import Search from '../components/search/Search'
import TopicTag from '../components/topic/TopicTag'

import { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux'
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/loading/Loading';

// import WhoWeAre from '../assets/images/who_we_are.png';

function HomeLogin() {
    return (
        <div className="home-login-page">
            {/* Search bar */}
            <Search isResult={false}/>

            <div className="home-login container-fluid">
                <div className="container">
                    <div className="row g-4">
                        {/* Tab bar */}
                        <div className="col-6">
                            {/* <img src={WhoWeAre} alt=""/> */}
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

