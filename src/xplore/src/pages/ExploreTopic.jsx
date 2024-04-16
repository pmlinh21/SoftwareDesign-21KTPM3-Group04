import React from 'react';
import "../styles/commons.css";
import "./ExploreTopic.css"

import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import { useLocation   } from 'react-router-dom';

import Loading from '../components/loading/Loading';
import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'
import {formatCapitalCase} from '../util/formatText';

function ResultText({topic_name, related_posts, followerCount}){
    return(
        <>
            <div className="row col-12 m-0 mb-4 d-flex justify-content-center">
                <h5 className="col-auto m-0 text-black mt-2">
                    {formatCapitalCase(topic_name)}
                </h5>
                <p className="p2 text-scheme-sub-text p-0 m-0 mt-2 col-12 text-center">
                    Topic ~ {followerCount} followers ~ {related_posts} related posts
                </p>
            </div>
        </>
    )

}

const fetchPost = async (id_topic, setResult, setLoading, id_user) => {
    try {
      setLoading((val) => true);
      const response = await fetch(`http://localhost:8080/api/topic/${id_topic}/post/user/${id_user}`);
      const jsonData = await response.json();
      setResult([...jsonData.content]);

      setLoading( (val) => false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

const fetchFollowerCount = async (id_topic, setResult, setLoading) => {
    try {
      setLoading((val) => true);
      const response = await fetch(`http://localhost:8080/api/topic/${id_topic}/follower-count`);
      const jsonData = await response.json();
      setResult(jsonData.content.followerCount);

      setLoading( (val) => false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export default function ExploreTopic() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_topic = searchParams.get('id_topic');
    const topic_name = searchParams.get('topic_name');
    // const topic = searchParams.get('topic');

    const {user_login} = useSelector(state => state.UserReducer)

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [followerCount, setFollowerCount] = useState(0)

    useEffect(()=>{
        fetchPost(id_topic, setPost, setLoading, user_login.id_user);
        fetchFollowerCount(id_topic, setFollowerCount, setLoading);
    },[id_topic])

    // console.log(result);
    // console.log(loading);

    return (
    <div className="explore-topic-page">

    <Search/>

    <div className="explore-topic container my-5 px-3 pt-3">
        <div className="row px-2 pt-3 d-flex justify-content-between">
            <div className="px-0 mt-5 row">
            <ResultText topic_name={topic_name} related_posts = {post?.length} followerCount={followerCount}/>
            {
                loading && <Loading/>
            }

            {
                !isNaN(id_topic) && !loading &&
                    <div className="container px-0 ps-4 ">
                        <div className="list-post row row-cols-3 gap-4">
                        {
                            post?.map((item) => {
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

            {/* {
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
            } */}
                
            </div>
            </div>
        </div>
    </div>
  );
}