import React from 'react';
import "../styles/commons.css";
import "./SearchResult.css"
import Navbar from '../components/navbar/Navbar'
import Search from '../components/search/Search'
import BlogCardNoThumb from '../components/blog-card/BlogCardNoThumb'
import TopicTag from '../components/topic/TopicTag'
import AuthorVertical from '../components/author-card/AuthorVertical'

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';

export default function SearchResult() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get('searchText');
    const type = searchParams.get('type');

    return (
    <div className="search-result-page">
        <Navbar/>
        <Search search={searchText} isResult={searchText !== null}/>

        <div className="search-result container mt-5 px-3">
            <div className="row mt-4 px-2 d-flex justify-content-between">

                <div className="col-7 px-0 mt-5">
                    <div className="row mt-4">
                        <p className="subtitle1 text-scheme-primary mb-1 mt-0">
                            {type.toUpperCase()}
                        </p>
                    </div>

                    <div className="row mb-4">
                        <h5 className="col-auto m-0 text-scheme-sub-text">
                            Results for
                        </h5>
                        <h5 className="col-auto m-0 p-0 text-black">
                            {searchText}
                        </h5>
                    </div>

                    <div className="row ps-2 gap-2">
                        <BlogCardHorizontal/>
                    </div>
                </div>


                <div className="col-4 px-0 mt-5">
                    <div className="row mt-4">
                        <h6 className="text-black mb-4">
                            Matching authors
                        </h6>
                    </div>
                    <div className="row">
                        <p className="p3 text-black">
                            You are following <span className="text-scheme-primary"> {0} </span> authors
                        </p>
                    </div>
                    <div className="container">
                        <AuthorHorizontal/>
                    </div>

                    <div className="row mt-4">
                        <h6 className="text-black mb-4">
                            Matching topics
                        </h6>
                    </div>
                    <div className="container px-0 d-flex gap-2 flex-wrap">
                        <TopicTag topic_name="So" />
                        <TopicTag topic_name="Sof" />
                        <TopicTag topic_name="Soft" />
                        <TopicTag topic_name="Softw" />
                        <TopicTag topic_name="Softwa" />
                        <TopicTag topic_name="Softwar" />
                    </div>
                    <div className="row mt-4">
                        <p className="button-1 text-scheme-primary mb-4 link-sm">
                            See all topics
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  );
}