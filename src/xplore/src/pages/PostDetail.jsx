import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import ReactPaginate from 'react-paginate';

import { formartToSQLDatetime, formatToMDY } from '../util/formatDate'

import "../styles/commons.css";
import "./PostDetail.css";
import "./SearchResult.css"

import {postService} from '../services/PostService';

import Search from '../components/search/Search'
import BookmarkIcon from '../components/icon/BookmarkIcon';
import LikeIcon from '../components/icon/LikeIcon';
import PostContent from './PostContent';
import Avatar from '../components/avatar/Avatar';
import ResponsePagination from '../components/response/ResponsePagination';
import Loading from '../components/system-feedback/Loading';
import NotFound from '../components/system-feedback/NotFound';
import Paywall from '../components/system-feedback/Paywall';
import ReportPopup from '../components/popup/ReportPopup';

const ITEMS_PER_PAGE = 10;

function Post() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id_post = parseInt(searchParams.get('id_post'));

    const {user_login} = useSelector(state => state.UserReducer)

    const [responses, setResponses] = useState(null);
    const [author, setAuthor] = useState(null);
    const [post, setPost] = useState(null);
    const [likeCount, setLikeCount] = useState(null);

    const [newReponse, setNewReponse] = useState("");

    const [loading, setLoading] = useState(null);
    const [accessed, setAccessed] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [reportContent, setReportContent] = useState(null);

    const fetchPost = async () => {
        try {
            setLoading({
                type: ''
            })
            const postResult = await postService.getPostById(id_post);
            const post = postResult.data.content
            if ((post.id_user != user_login.id_user) && (
                !post?.publish_time || new Date(post.publish_time).getTime() > new Date().getTime()) ){
                setNotFound(true)
            } else{
                if (post.is_member_only && !user_login.is_member)
                    setAccessed(false)
                setPost({...post});
                setLikeCount(parseInt(post.likeCount));
            }
            setLoading(null)

        } catch (error) {
            console.error("Error fetching post:", error);
            
        }
    };

    const fetchResponse = async() =>{
        try {
            setLoading({
                type: ''
            })
            const result = await postService.getResponseOfPost(id_post);
            setResponses([...result.data.content.responses]);
            setAuthor({...result.data.content.author});
            setLoading(null)
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }

    useEffect(() => {
        
        if (!post)
            fetchPost();
        if (!responses && !notFound && accessed) {
            fetchResponse();
        }
    },[id_post])

    useEffect(() => {   
        const timeoutId = setTimeout(() => {
            // createReadingHistory(); 
        }, 10000); 

        setTimerId(timeoutId);

        return () => clearTimeout(timeoutId);
    }, []);

    const createReadingHistory = async () => {
        try {
            await postService.readPost({
                id_user: user_login.id_user, id_post: id_post, 
                reading_time: formartToSQLDatetime(new Date())})
        } catch (e) {
            console.log(e)
        } 
    }

    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        // window.scrollTo(0, 0);
        return () => {
            clearTimeout(timerId);
        };
    }, [location, timerId]); 


    const responsePost = async () => {
        try {
            setLoading({type: "full"})
            const result = await postService.responsePost({
                id_user: user_login.id_user, id_post: id_post, response: newReponse,
                response_time: formartToSQLDatetime(new Date())
            });
            const addedReponse = {...result.data.content,
                user:{
                    id_user: user_login.id_user,
                    fullname: user_login.fullname,
                    avatar: user_login.avatar
                }
            }
            setResponses([addedReponse, ...responses]);
            setNewReponse("");
            setLoading(null)
        } catch (error) {
            console.log("error", error.response);
        }
    }

    const deleteResponse = (id_response) => {
        const newResponses = responses.filter(response => response.id_response != id_response);
        setResponses([...newResponses]);
    }

    return (
        <div>
            {/* Search bar */}
            <Search />
            {/* Post Detail */}
            {loading?.type == '' && <Loading/>}
            {!loading && notFound && <NotFound/>}
            {loading?.type != '' && !notFound && (
                <div className='container-fluid' style={{marginTop: '72px'}}>
                {loading?.type == 'full' && <Loading type={loading.type}/>}
                <div className='container'>
                {
                    (reportContent != null) && (
                        <ReportPopup reportContent={reportContent} setReportContent={setReportContent}/>
                    )
                }
                    (
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            {/* Post Title */}
                            <h5 style={{marginBottom: '1rem'}}>{post?.title}</h5>
                            {/* Post Topics */}
                            <div className="d-flex flex-wrap gap-2">
                                {post?.list_topic?.map(topic => (
                                    <button key={topic.id_topic} className='topic label2 capitalize'>{topic.topic}</button>
                                ))}
                            </div>
                            {/* Post Authors */}
                            <hr/>
                            <div className='d-flex justify-content-between' style={{gap: '16px', padding: '24px 0'}}>
                                <div className='d-flex gap-3'>
                                    {/* Avatar */}
                                    <Avatar avatar={post?.author?.avatar} size="small"/>
                                    {/* Name */}
                                    <div className='d-flex flex-column'>
                                        <p className='support' style={{color: 'var(--scheme-sub-text)', marginBottom: '8px' }}>Posted by</p>
                                        <p className='label1' style={{margin: '0', color: 'var(--scheme-text)' }}>{post?.author?.fullname}</p>
                                    </div>
                                    {/* Date */}
                                    <div className='d-flex flex-column'>
                                        <p className='support' style={{ color: 'var(--scheme-sub-text)', marginBottom: '8px' }}>Date posted</p>
                                        {/* <p className='label1' style={{margin: '0', color: 'var(--scheme-text)' }}>{new Date(post?.publish_time).toDateString()}</p> */}
                                        <p className='label1' style={{ margin: '0', color: 'var(--scheme-text)' }}>{post?.publish_time && formatToMDY(post?.publish_time)}</p>
                                    </div>
                                    {
                                        (user_login?.id_user != post?.author?.id_user) &&
                                        <button className='prim-btn btn-sm' style={{width: '117px'}}>Follow</button>
                                    }
                                    
                                </div>
                                
                                {/* Post Actions */}
                                <div className='d-flex gap-2 align-items-center' >
                                    <LikeIcon likeCount={likeCount} id_post={id_post} setLikeCount={setLikeCount}/>
                                    <button id='comment-btn' className="d-flex align-items-center">
                                        <a href="#response-section" className="text-scheme-sub-text">
                                            <i className="fa-regular fa-message me-1" style={{fontSize: '20px'}}></i> 
                                        </a>
                                        {post?.responseCount}
                                    </button>
                                    <BookmarkIcon id_post={id_post} regular_icon  thumbnail={post?.thumbnail}/>
                                    {
                                        (user_login?.id_user != post?.author?.id_user) && (
                                            <button id='report-btn' onClick={() => setReportContent({id_post: id_post})}>
                                                <i className="fa-solid fa-flag" style={{fontSize: '20px'}}></i>
                                            </button>
                                        )
                                    }
                                    
                                </div>
                            </div>
                            <hr/>

                            {
                                accessed ? (
                                    <>
                                    {/* Post Content */}
                                    <PostContent content={post?.content} id_post={id_post}/>
                                    {/* Responses */}
                                    <div id="response-section" className='col-12 d-flex flex-column mt-5 pt-3 align-items-start'>
                                        <h6 className="px-0" style={{color: 'var(--blue-500)'}}>Responses ({responses?.length})</h6>
                                        {/* Send response */}
                                        <div className='col-12 d-flex flex-row gap-3 m-0 mt-3 px-0'>
                                            <Avatar avatar={user_login?.avatar} size="small"/>
                                            <textarea
                                                className="response-textarea"
                                                value={newReponse}
                                                onChange={(e) => {setNewReponse(e.target.value)}}
                                                placeholder="Enter your response here..."
                                                rows={5}
                                                cols={78}
                                            />
                                            <button className='prim-btn btn-md' style={{width: '104px'}}
                                                disabled={newReponse.length === 0}
                                                onClick={responsePost}>Send</button>
                                        </div>
                                        <ResponsePagination author={author} responses={responses} 
                                            deleteResponse={deleteResponse} 
                                            setReportContent={setReportContent}
                                            setResponses={setResponses}
                                            setLoading={setLoading}/>
                                    </div>
                                    </>
                                ):(
                                    <Paywall/>
                                )
                            }
                            
                        </div>
                        <div className='col-2'></div>
                    </div>  
                    )
                </div>
                </div>
            )}
        </div>
    )
}
export default Post;