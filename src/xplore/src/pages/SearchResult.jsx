import React from 'react';
import "../styles/commons.css";
import "./SearchResult.css"
import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'

import { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux'
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/loading/Loading';

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

const fetchData = async (type, search, setResult, setLoading, id_user) => {
    try {
      setLoading((val) => true);
      const response = await fetch(`http://localhost:8080/api/${type}/search/${search}/user/${id_user}`);
      const jsonData = await response.json();
      

      setResult((result) => { return {...result, [`${type}`]: jsonData.content}} );
      setLoading((val) => false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export default function SearchResult() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get('searchText');
    const type = searchParams.get('type');
    // const topic = searchParams.get('topic');

    const {user_login} = useSelector(state => state.UserReducer)

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(()=>{
        if (type === "all"){
            fetchData("post",searchText, setResult, setLoading,  user_login.id_user);
            fetchData("topic",searchText, setResult, setLoading, user_login.id_user);
            fetchData("user",searchText, setResult, setLoading, user_login.id_user);
        } else
            fetchData(type,searchText, setResult, setLoading, user_login.id_user);
        
    
    },[searchText,type])

    // console.log(result);
    // console.log(loading);

    return (
    <div className="search-result-page">

    <Search search={searchText} isResult={searchText !== null}/>

    <div className="search-result container my-5 px-3 pt-3">
        <div className="row px-2 pt-3 d-flex justify-content-between">
            <div className="px-0 mt-5 row">
            <ResultText type={type} searchText={searchText}/>
            {
                loading && <Loading/>
            }
            {
                type === "all" && !loading && (
                <>
                    <div className="col-7">
                        <div className="container d-flex flex-wrap gap-3 px-0">
                        {
                            result?.post?.map((item) => {
                                return (
                                    <BlogCardHorizontal
                                        key={item.id_post}
                                        {...item}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div className="row">
                            <h6 className="text-black mb-4">
                                Matching authors
                            </h6>
                        </div>
                        {
                            result?.user?.length ? (
                                <>
                                    <div className="container d-flex gap-3 flex-wrap">
                                    {
                                            result?.user?.map((item) => {  
                                                return (
                                                        <AuthorHorizontal
                                                            key={item.id_user}
                                                            {...item}
                                                        />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row mt-4">
                                        <p className="button-1 text-scheme-primary mb-4 link-sm">
                                            <a href={`/search-result?type=user&searchText=${searchText}`}>
                                                See all authors <i className="fa-solid fa-arrow-right"></i>
                                            </a>
                                        </p>
                                    </div>
                                </>
                            ): (
                                <div className="row">
                                    <p className="text-scheme-sub-text mb-4 subtitle1 text-align-center">
                                        No matching authors
                                    </p>
                                </div>
                            )
                        }
                        
                        
                        <div className="row mt-4">
                            <h6 className="text-black mb-4">
                                Matching topics
                            </h6>
                        </div>
                        
                        {
                            result?.topic?.length ? (
                                <>
                                <div className="container px-0 d-flex gap-2 flex-wrap">
                                {
                                    result?.topic?.map((item) => {
                                        return (
                                            <TopicTag
                                                key={item.id_topic}
                                                {...item}
                                            />
                                        )
                                    })
                                }
                                </div>
                                <div className="row mt-4">
                                    <p className="button-1 text-scheme-primary mb-4 link-sm">
                                        <a href={`/search-result?type=topic&searchText=${searchText}`}>
                                            See all topics <i className="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </p>
                                </div>
                                </>
                            ) : (
                                <div className="row">
                                    <p className="text-scheme-sub-text mb-4 subtitle1 text-align-center">
                                        No matching authors
                                    </p>
                                </div>
                            )
                        }
                        {
                            
                        }
                        
                    </div>

                </>
                )
            }

            {
                type === "post" && !loading &&
                    <div className="container px-0 ps-4 ">
                        <div className="list-post row row-cols-3 gap-4">
                        {
                            result?.post?.map((item) => {
                                return (
                                    <BlogPostCard
                                        key={item.id_post}
                                        {...item}
                                    />
                                )
                            })
                        }
                        </div>
                        
                    </div>
            }

            {
                type === "topic" && !loading &&
                    <div className="container col-6 px-0 d-flex gap-2 flex-wrap justify-content-center">
                        {
                            result?.topic?.map((item) => {
                                return (
                                    <TopicTag
                                        key={item.id_topic}
                                        {...item}
                                    />
                                )
                            })
                        }
                    </div>
            }

            {
                type === "user" && !loading &&
                    <div className="container px-0 ps-3">
                        <div className="list-author row row-cols-2 gap-3">
                            {
                                result?.user?.map((item) => {  
                                    return (
                                        <div className="col">
                                            <AuthorHorizontal
                                                key={item.id_user}
                                                {...item}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>   
                    </div>
            }
                
            </div>
            </div>
        </div>
    </div>
  );
}