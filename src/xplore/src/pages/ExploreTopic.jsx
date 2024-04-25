import React from 'react';
import "../styles/commons.css";
import "./ExploreTopic.css"

import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useLocation   } from 'react-router-dom';

import Loading from '../components/loading/Loading';
import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'

import {formatCapitalCase} from '../util/formatText';
import { DOMAIN } from "../util/config";
import { FollowTopicAction, getTopicByUserAction, UnfollowTopicAction } from '../redux/actions/UserAction';

function ResultText({topic_name, related_posts, followerCount}){
    return(
        <>
            <div className="row col-12 m-0 mb-4 d-flex justify-content-center">
                <h5 className="col-auto m-0 text-black mt-2">
                    {formatCapitalCase(topic_name)}
                </h5>
                <p className="p2 text-scheme-sub-text p-0 m-0 mt-2 col-12 text-center">
                    Topic • {followerCount} followers • {related_posts} related posts
                </p>
            </div>
        </>
    )

}

const fetchPost = async (id_topic, setResult, setLoading) => {
    try {
      setLoading((val) => true);
      const response = await fetch(`${DOMAIN}/topic/${id_topic}/post`);
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
      const response = await fetch(`${DOMAIN}/topic/${id_topic}/follower-count`);
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
    const id_topic = parseInt(searchParams.get('id_topic'));
    const topic_name = searchParams.get('topic_name');
    
    const dispatch = useDispatch();

    const {user_login, topic} = useSelector(state => state.UserReducer)

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState([]);
    const [followerCount, setFollowerCount] = useState(null)
    const [isFollow, setIsFollow] = useState(topic?.includes(id_topic))

    useEffect(()=>{
        fetchPost(id_topic, setPost, setLoading);
        fetchFollowerCount(id_topic, setFollowerCount, setLoading);

        if (topic == null){
            dispatch(getTopicByUserAction(user_login?.id_user))
        }
    },[id_topic])

    function handleUnfollowButton(){
        dispatch(UnfollowTopicAction(user_login?.id_user, id_topic))
        setIsFollow(false)
    }

    function handleFollowButton(){
        dispatch(FollowTopicAction(user_login?.id_user, id_topic))
        setIsFollow(true)
    }

    
    return (
    <div className="explore-topic-page">

    <Search/>

    <div className="explore-topic container my-5 px-3 pt-3">
        <div className="row px-2 pt-3 d-flex justify-content-between">
            <div className="px-0 mt-5 row d-flex flex-column align-items-center">
            {
                loading && <Loading/>
            }

            {
                !isNaN(id_topic) && !loading &&
                <>
                    <ResultText topic_name={topic_name} related_posts = {post?.length} followerCount={followerCount}/>
                
                    {
                        isFollow ? (
                            <button className="unfollow-btn tert-btn rounded-1 button1 col-auto p-3 px-5 mb-5"
                                onClick={handleUnfollowButton}>
                                Unfollow
                            </button>  
                        )
                        :(
                            <button className="follow-btn prim-btn rounded-1 button1 col-auto p-3 px-5 mb-5 "
                                onClick={handleFollowButton}>
                                Follow <i className="fa-solid fa-plus m-0 ms-1"></i>
                            </button>
                        )
                    }

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
                </>
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