import "../styles/commons.css";
import "./Writing.css";
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
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
    const [scheduleTime, setScheduleTime] = useState(null, true, true)
    const [displayModal, setDisplayModal] = useState(false)

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
        changePostInfo("status", 2)
        changePostInfo("publish_time",scheduleTime)
        saveChanges()
    }

    function publishPost(){
        changePostInfo("status", 1)
        changePostInfo("publish_time",formartToSQLDatetime(new Date()))
        saveChanges()
    }

    function saveChanges(status){
        const newTopic = postInfo.topic?.map(topic => topic.value)

        postInfo.status = status
        changePostInfo("status", status)

        if (status == 1){
            postInfo.publish_time = formartToSQLDatetime(new Date())
            changePostInfo("publish_time",formartToSQLDatetime(new Date()))
        } else{
            postInfo.publish_time = scheduleTime
            changePostInfo("publish_time",scheduleTime)
        }
        

        // if (id_post == null){
            dispatch(createPostAction({
                ...postInfo, 
                topic: [...newTopic],
                id_user: user_login?.id_user,
                creation_time: formartToSQLDatetime(new Date()), }))
        // }
        // else {
        //     dispatch(createPostAction({
        //         ...postInfo, 
        //         id_user: user_login?.id_user,
        //         id_post: id_post }))
        // }
    }

    function handleBackButton(){
        saveChanges()
        window.history.back()
    }

    function changePostInfo(field, value){
        setPostInfo( {
            ...postInfo,
            [`${field}`]: value
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
                displayModal && (
                    <div className="modal-overlay">
                    <div className="modal-popup">
                        <form onSubmit={(e) => {e.preventDefault()}}>
                            <div className="form-group">
                                <label className="button1">Upload thumbnail</label>
                                <ThumbnailDrop thumbnail={postInfo.thumbnail} changePostInfo={changePostInfo}/>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" value={postInfo.title} onChange={(e)=>{changePostInfo("title",e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Topic</label>
                                <TopicDropdown topicOption={topics} setTopic={setTopic} topic={postInfo.topic}/>
                            </div>
                            <div className="form-row">
                                <div className="checkbox d-flex align-items-center">
                                    <input type="checkbox" id="remember" checked={postInfo.is_member_only} 
                                        onChange={(e)=>{changePostInfo("is_member_only",e.target.checked)}}/>
                                    <label htmlFor="remember">Make the post be member-only</label>
                                </div>
                            </div>
                            <div className="form-group d-flex flex-column ">
                                <label>Schedule</label>
                                    <DatePicker
                                        selected={scheduleTime}
                                        onChange={(date) => setScheduleTime(date)}
                                        dateFormat="dd-MM-yyyy HH:mm:ss"
                                        minDate={new Date()}
                                        className="date-picker"
                                        placeholderText="Select a date"
                                    />
                            </div>

                            <div className="row col-12 d-flex justify-content-between m-0 p-0">
                                <button type="button" onClick={() => setDisplayModal(false)}
                                    className=" btn col-4 link-md rounded-1 button2 bg-white text-scheme-sub-text p-3">Cancel</button>
                                <button type="submit" className="col-4 btn prim-btn rounded-1 button2 p-3 " 
                                        onClick={() => {saveChanges(2)}}>Schedule</button>
                                <button type="submit" className="col-4 btn prim-btn rounded-1 button2 p-3 " 
                                        onClick={() => {saveChanges(1)}}>Publish now</button>
                                
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
                <TextEditor content={postInfo.content} changePostInfo={changePostInfo}></TextEditor>
            </div>
        </div>
    );
}

const ThumbnailDrop = ({thumbnail, changePostInfo}) => {
  
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        // console.log(file)
        changePostInfo("thumbnail",reader.result);
        setFilename(file.name)
      };
  
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: 'image/jpeg, image/png',
        multiple: false, });
  
    const [fileName, setFilename] = useState("")
    return (
      <div {...getRootProps()} className="image-input-container">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="p2 m-0 text-drag-and-drop">Drop the image here...</p> :
            <p className="p2 m-0 text-drag-and-drop">Drag and drop an image here, or click to select an image</p>
        }
        {thumbnail && (
          <div className="image-preview">
            {/* <img src={thumbnail} alt="Selected" className="preview-image" /> */}
            <p className="p2 m-0 text-scheme-primary">{fileName}</p>
          </div>
        )}
      </div>
    );
};

const TopicDropdown = ({topicOption, topic, setTopic, maxOptions = 5}) => {
    const [error, setError] = useState("")
  const options = topicOption.map(topic => {
    return {
      value: topic.id_topic,
      label: formatCapitalCase(topic.topic)
    }
  })

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontFamily: 'regular-font', // Define your font family here
      fontSize: '16px', // Define font size if needed
    }),
    option: (provided) => ({
      ...provided,
      fontFamily: 'regular-font', // Define your font family here
    }),
  };

  const handleChange = (newTopic) => {
    if (newTopic && newTopic.length <= maxOptions) {
        setTopic(newTopic || []);
        setError("")
    } else{
        setError("The number of topics exceeds 5")
    }
    
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={topic}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Add or change topics (up to 5) ..."
      />
      {
        error && (
            <p className="p3 m-0 pt-1 text-error text-start ">{error}</p>
        )
      }
    </div>
  );
};

