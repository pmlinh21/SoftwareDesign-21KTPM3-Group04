import React from 'react';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useLocation   } from 'react-router-dom';

import "./SearchResult.css"

import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/system-feedback/Loading';

import { DOMAIN } from "../util/config";
import { getUserBlockAction } from '../redux/actions/UserAction';

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

const fetchData = async (type, search, setResult, setLoading, user_block) => {
    try {
        setLoading(true);
        const response = await fetch(`${DOMAIN}/${type}/search/${search}`);
        const jsonData = await response.json();
      
        let newResult = jsonData.content
        console.log(newResult)
        const formatBlock = user_block?.map(user => user.id_user)
        if (type == "user"){
            newResult = newResult.filter(user => !formatBlock?.includes(user.id_user))
        } else if (type == "post"){
            newResult = newResult.filter(post => !formatBlock?.includes(post.author.id_user))
        }

        setResult((result) => {
            return {...result, [`${type}`]: newResult}
        });
        setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export default function SearchResult() {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get('searchText');
    const type = searchParams.get('type');

    const {user_login, user_block} = useSelector(state => state.UserReducer)

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(()=>{
        if (type === "all"){
            fetchData("post",searchText, setResult, setLoading,  user_block);
            fetchData("topic",searchText, setResult, setLoading, user_block);
            fetchData("user",searchText, setResult, setLoading, user_block);
        } else {
            fetchData(type,searchText, setResult, setLoading, user_block);
        }
    }, [searchText,type, user_block?.length])

    useEffect(() => {
        if (user_login?.id_user && user_block == null){
            dispatch(getUserBlockAction(user_login?.id_user))
        }
    },[])

    return (
    <div className="search-result-page">

    <Search search={searchText} isResult={searchText !== null}/>

    <div className="search-result container my-0 px-3 pt-0">
        <div className="row px-2 pt-0 d-flex justify-content-between">
            <div className="px-0 mt-5 row">
            <ResultText type={type} searchText={searchText}/>
            {
                loading && <Loading/>
            }
            {
                type === "all" && !loading && (
                <>
                    <div className="col-7">
                        { result?.post?.length ? (
                            <div className="container d-flex flex-wrap gap-3 px-0">
                            {
                                result?.post?.map((item) => {
                                    return (
                                        <BlogCardHorizontal
                                            key={item.id_post}
                                            post={item}
                                        />
                                    )
                                })
                            }
                            </div>
                        ): (
                            <div className="row">
                                <p className="text-scheme-sub-text p1 text-center">
                                    No matching posts
                                </p>
                            </div>
                        )
                        }
                        
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
                                                            author={item}
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
                                    <p className="text-scheme-sub-text mb-4 p1">
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
                                                topic={item}
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
                                    <p className="text-scheme-sub-text mb-4 p1">
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
                        {
                            result?.post?.length ? (
                                <div className="list-post row row-cols-3 gap-3 d-flex">
                                {
                                    result?.post?.map((item) => {
                                        return (
                                            <BlogPostCard
                                                key={item.id_post}
                                                post={item}
                                            />
                                        )
                                    })
                                }
                                </div>
                            ): (
                                <div className="row">
                                    <p className="text-scheme-sub-text p1 text-center">
                                        No matching posts
                                    </p>
                                </div>
                            )
                        }                        
                    </div>
            }

            {
                type === "topic" && !loading &&
                    <div className="container col-6 px-0 d-flex gap-2 flex-wrap justify-content-center">
                        {
                            result?.topic?.length ? (
                                <>
                                {
                                    result?.topic?.map((item) => {
                                        return (
                                            <TopicTag
                                                key={item.id_topic}
                                                topic={item}
                                            />
                                        )
                                    })
                                }
                                </>
                            ) : (
                                <div className="row">
                                    <p className="text-scheme-sub-text p1 text-center">
                                        No matching topics
                                    </p>
                                </div>
                            )
                        }
                    </div>
            }

            {
                type === "user" && !loading &&
                    <div className="container px-0 ps-3">
                        {
                            result?.user?.length ? (
                                <div className="list-author row row-cols-2 gap-3 d-flex justify-content-between">
                                {
                                    result?.user?.map((item) => {
                                        return (
                                            <AuthorHorizontal
                                                key={item.id_user}
                                                author={item}
                                            />
                                        )
                                    })
                                }
                                </div>
                            ) : (
                                <div className="row">
                                    <p className="text-scheme-sub-text p1 text-center">
                                        No matching authors
                                    </p>
                                </div>
                            )
                        }
                    </div>
            }
                
            </div>
            </div>
        </div>
    </div>
  );
}