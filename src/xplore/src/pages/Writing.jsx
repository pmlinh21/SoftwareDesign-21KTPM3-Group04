import "../styles/commons.css";
import "./Writing.css";
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {Link, useLocation,redirect } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getPostByUser, createPostAction } from "../redux/actions/PostAction";

import TextEditor from './TextEditor';

import {formartToSQLDatetime} from '../util/formatDate'
import {formatCapitalCase} from '../util/formatText'

export default function Writing() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_post = searchParams.get('id_post');

    const {posts} =  useSelector(state => state.PostReducer)
    const {user_login} =  useSelector(state => state.UserReducer)
    const {topics} =  useSelector(state => state.TopicReducer)

    const [postInfo, setPostInfo] = useState({
        content: "",
        title: "",
        thumbnail: "",
        topic: [],
        is_member_only: false,
        status: 0,
        publish_time: null
    })
    const [scheduleTime, setScheduleTime] = useState(null)
    const [displayModel, setDisplayModal] = useState(false)

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPostByUser(user_login?.id_user))
    },[])

    useEffect(()=>{
            const selectedPost = posts.find(post => post.id_post == id_post)
            if(selectedPost){
                setPostInfo(
                    {...postInfo,
                    content: selectedPost?.content ,
                    title: selectedPost?.title,
                    thumbnail: selectedPost?.thumbnail ,
                    topic: selectedPost?.topic ,
                    is_member_only: selectedPost?.is_member_only ,
                    status: selectedPost?.status ,
                    publish_time: selectedPost?.publish_time
                })
            }
    },[posts])

    function handlePreviewButton(){

    }

    function schedulePost(){
        setStatus(2)
        setPublistTime(scheduleTime)
        saveChanges()
    }

    function publishPost(){
        setStatus(1)
        setPublistTime(new Date())
        saveChanges()
    }

    function saveChanges(){
        const newTopic = postInfo.topic?.map(topic => topic.value)
        postInfo.topic = [...newTopic]

        // if (id_post == null){
        //     dispatch(createPostAction({
        //         ...postInfo, 
        //         id_user: user_login?.id_user,
        //         creation_time: formartToSQLDatetime(new Date()), }))
        // }
        // else {
        //     dispatch(createPostAction({
        //         ...postInfo, 
        //         id_user: user_login?.id_user,
        //         id_post: id_post }))
        // }
        
        console.log(postInfo)
    }

    function handleBackButton(){
        saveChanges()
        window.history.back()
    }
    
    function setContent(newContent){
        setPostInfo({
           ...postInfo,
            content: newContent
        })
    }

    function setStatus(newStatus){
        setPostInfo({
           ...postInfo,
            status: newStatus
        })
    }

    function setPublistTime(newPublishTime){
        setPostInfo({
           ...postInfo,
            publish_time: newPublishTime
        })
    }

    function setTopic(newTopic){
        setPostInfo({
            ...postInfo,
             topic: [...newTopic]
         })
    }

    return (
        <div className="writing-page">
            {
                displayModel && (
                    <div className="modal-overlay">
                    <div className="modal-popup">
                        <form onSubmit={(e) => {e.preventDefault()}}>
                            <div className="form-group">
                                <label className="button1">Upload thumbnail</label>
                                <input type="file" name="thumbnail" />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title"/>
                            </div>
                            <div className="form-group">
                                <label>Topic</label>
                                <TopicDropdown topicOption={topics} setTopic={setTopic} topic={postInfo.topic}/>
                            </div>
                            <div className="form-row">
                                <div className="checkbox">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Make the post be member-only</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Schedule</label>
                                <input type="text" name="title"/>
                            </div>

                            <div className="row col-12 d-flex justify-content-between m-0 p-0">
                                <button type="submit" className="col-auto btn prim-btn rounded-1 button2 p-3 px-5" 
                                        onClick={schedulePost}>Schedule</button>
                                <button type="submit" className="col-auto btn prim-btn rounded-1 button2 p-3 px-5" 
                                        onClick={publishPost}>Publish now</button>
                            </div>
                            <div className="row col-12 d-flex m-0 p-0">
                                <button type="button" onClick={() => setDisplayModal(false)}
                                className=" btn link-md rounded-1 button2 bg-white text-scheme-sub-texte p-3">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                )
            }
            <div className="container toolbar">
                <div className="col-12 m-0 p-0 d-flex justify-content-between align-items-center">
                    <Link to="#" onClick={handleBackButton} className='text-black link-sm'>
                        <i className="text-black fa-solid fa-arrow-left"></i>
                        &nbsp;Back
                    </Link>
                    <div className="col-auto">
                        <button className="link-md rounded-1 button2 bg-white text-scheme-sub-text border-left"
                            onClick={saveChanges}>
                            Save
                        </button>
                        <button className="link-md rounded-1 button2 bg-white text-scheme-sub-text border-left"
                            onClick={handlePreviewButton}>
                            Preview
                        </button>
                        <button className="prim-btn rounded-1 button2"
                            onClick={() => {setDisplayModal(true)}}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
            <div className="container col-12 mt-3">
                <TextEditor content={postInfo.content} setContent={setContent}></TextEditor>
            </div>
        </div>
    );
}


const TopicDropdown = ({topicOption, topic, setTopic}) => {
  const options = topicOption.map(topic => {
    return {
      value: topic.id_topic,
      label: formatCapitalCase(topic.topic)
    }
  })

  const handleChange = (newTopic) => {
    setTopic(newTopic || []);
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={topic}
        onChange={handleChange}
      />
    </div>
  );
};

