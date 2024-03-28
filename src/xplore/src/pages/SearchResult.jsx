import React from 'react';
import "../styles/commons.css";
import "./SearchResult.css"
import Navbar from '../components/navbar/Navbar'
import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';


function ResultText({type, searchText}){
    return(
        <>
            <div className="row mt-4 ">
                <p className="subtitle1 text-scheme-primary mb-1 mt-0 ps-3">
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
        </>
    )

}

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

            {
                type == "all" && (
                <>
                    <div className="col-7 px-0 mt-5 ">
                        <ResultText type={type} searchText={searchText}/>

                        <div className="container d-flex flex-wrap gap-3 px-0">
                            <BlogCardHorizontal/>
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
                        <div className="container d-flex gap-3 flex-wrap">
                            <AuthorHorizontal/>
                            <AuthorHorizontal isSubscribe={false}/>
                        </div>
                        <div className="row mt-4">
                            <p className="button-1 text-scheme-primary mb-4 link-sm">
                                <a href={`/search-result?type=author&searchText=${searchText}`}>
                                    See all authors <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </p>
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
                                <a href={`/search-result?type=topic&searchText=${searchText}`}>
                                    See all topics <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </p>
                        </div>
                    </div>
                </>
                )
            }

            {
                type == "post" && 
                <div className="px-0 mt-5">
                    <ResultText type={type} searchText={searchText}/>
                    <div className="container px-0 ps-3">
                        <div className="list-post row row-cols-3 gap-3">
                            <BlogPostCard />
                            <BlogPostCard />
                            <BlogPostCard />
                            <BlogPostCard />
                        </div>
                        
                    </div>
                </div>
            }

            {
                type == "topic" && 
                <div className="px-0 mt-5">
                    <ResultText type={type} searchText={searchText}/>
                    <div className="container col-6 px-0 d-flex gap-2 flex-wrap justify-content-center">
                        <TopicTag topic_name="So" />
                        <TopicTag topic_name="Sof" />
                        <TopicTag topic_name="Soft" />
                        <TopicTag topic_name="Softw" />
                        <TopicTag topic_name="Softwa" />
                        <TopicTag topic_name="Softwar" />
                        <TopicTag topic_name="So" />
                        <TopicTag topic_name="Sof" />
                        <TopicTag topic_name="Soft" />
                        <TopicTag topic_name="Softw" />
                        <TopicTag topic_name="Softwa" />
                        <TopicTag topic_name="Softwar" />
                    </div>
                </div>
            }

            {
                type == "author" && 
                <div className="px-0 mt-5">
                    <ResultText type={type} searchText={searchText}/>
                    <div className="container px-0 ps-3">
                        <div className="list-author row row-cols-2 gap-3">
                            <div className="col">
                                <AuthorHorizontal isSubscribe={false}/>
                            </div>

                            <div className="col">
                                <AuthorHorizontal isSubscribe={false}/>
                            </div>

                            <div className="col">
                                <AuthorHorizontal/>
                            </div>

                        </div>   
                    </div>
                </div>
            }
                
            </div>
            
        </div>
    </div>
  );
}