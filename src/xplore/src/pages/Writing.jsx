import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'

import "../styles/commons.css";
import "./Writing.css";

import { getPostByUser, createPostAction, updatePostAction } from "../redux/actions/PostAction";

import TextEditor from './TextEditor';
import Loading from '../components/system-feedback/Loading'
import NotFound from '../components/system-feedback/NotFound'

import {formartToSQLDatetime} from '../util/formatDate'
import {formatCapitalCase} from '../util/formatText'
import { postService } from '../services/PostService';

function Toolbar({handleBackButton, handleDeleteButton, setDisplayModal, id_post, handleSaveButton }){
    console.log(id_post)
    return(
        <div className="container toolbar">
        <div className="col-12 m-0 p-0 d-flex justify-content-end align-items-center">

            <div className="col-auto">
                
                <button className="tert-btn rounded-1 button2 bg-white me-2"
                    onClick={handleSaveButton}>
                    Save
                </button>
                {
                    !isNaN(id_post)  && 
                    <button className="sec-btn rounded-1 button2 me-2"
                        onClick={handleDeleteButton}>
                        Delete
                    </button>
                }
                
                <button className="prim-btn rounded-1 button2"
                    onClick={() => {setDisplayModal(true)}}>
                    Publish
                </button>
            </div>
        </div>
    </div>
    )
}
  
export default function Writing() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id_post = parseInt(searchParams.get('id_post'));

    const {posts} =  useSelector(state => state.PostReducer)
    const {user_login} =  useSelector(state => state.UserReducer)
    const {topics} =  useSelector(state => state.TopicReducer)
    const {loading} =  useSelector(state => state.LoadingReducer)
    const [notFound, setNotFound] = useState(false)

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
    const [uploadedThumbnail, setUploadedThumbnail] = useState(null)
    const [displayModal, setDisplayModal] = useState(false)

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (posts == null){
            dispatch(getPostByUser(user_login?.id_user))
        }
    },[])

    useEffect(()=>{
        const selectedPost = posts?.find(post => post.id_post == id_post)
        const topic = selectedPost?.list_topic.map(topic => {
            // console.log(topic)
            return {value: topic.id_topic, label: formatCapitalCase(topic.topic)}
        })
    

        console.log(selectedPost)
        if(selectedPost){
            setPostInfo(
                {...postInfo,
                content: selectedPost?.content ,
                title: selectedPost?.title,
                thumbnail: selectedPost?.thumbnail ,
                topic: topic ,
                is_member_only: selectedPost?.is_member_only ,
                status: selectedPost?.status ,
                publish_time: selectedPost?.publish_time
            })

            if (selectedPost.status === 2){
                setScheduleTime(new Date(selectedPost.publish_time))
            }
            setNotFound(false)
        } else{
            if (searchParams.get('id_post') != undefined) 
                setNotFound(true)
        }
    },[posts])

    const deletePost = async () => {
        try {
            const result = await postService.deletePost({id_post: id_post});
            if (result.status === 200) {
                navigate('/drafts', { state: { tab: "drafts" } });
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    function handleDeleteButton(){
        if (id_post !== NaN) {
            if (window.confirm("Are you sure you want to delete your writing?")){
                navigate('/home', { replace: true })
            }
        } else {
            // check for draft
            if (window.confirm("Are you sure you want to delete this post?")){
                deletePost()
                if (postInfo.status === 1)
                    navigate('/drafts', { state: { tab: "published" } });
                else
                    navigate('/drafts', { state: { tab: "drafts" } });
            }
        }
    }

    function handleBackButton(){
        navigate('/', { replace: true });
    }

    function handleSaveButton(){
        if (!postInfo.title || !postInfo.content){
            alert("Please enter the title and content")
        } else if (postInfo.title && postInfo.content){
            saveChanges()
        } 
    }

    function saveChanges(status){
        // user do not press "Save" button
        if (status){
            postInfo.status = status
            changePostInfo("status", status)
        }

        if (status === 1){
            postInfo.publish_time = formartToSQLDatetime(new Date())
            changePostInfo("publish_time",formartToSQLDatetime(new Date()))
        } else if (status === 2 || postInfo.status === 2){

            if (!scheduleTime){
                alert ("Please select schedule date")
                return
            }

            postInfo.publish_time = scheduleTime
            changePostInfo("publish_time",scheduleTime)
        }

        if (isNaN(id_post)){
            // console.log(uploadedThumbnail)
            dispatch(createPostAction({
                ...postInfo, 
                id_user: user_login?.id_user,
                creation_time: formartToSQLDatetime(new Date())
            }, uploadedThumbnail
        ))
        //navigate('/drafts', { state: { tab: "drafts" } });
        }
        else {
            // console.log(postInfo.topic)
            dispatch(updatePostAction({
                ...postInfo, 
                id_post: id_post 
            },uploadedThumbnail
        ))
        //navigate(`/drafts`, { state: { tab: "published" } });
        }

        if(postInfo.status !== 1)
            navigate('/drafts', { state: { tab: "drafts" } });
        else
            navigate(`/drafts`, { state: { tab: "published" } });

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
    
    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowEditor(true);
            // setLoading(true);
        }, 1500); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }, []);

    return (
        <div className="writing-page h-100">
            {
                displayModal && (
                    <div className="modal-overlay">
                    <div className="modal-popup">
                        <form onSubmit={(e) => {e.preventDefault()}}>
                            <div className="form-group">
                                <label className="button1">Upload thumbnail</label>
                                <ThumbnailDrop thumbnail={postInfo.thumbnail} uploadedThumbnail={uploadedThumbnail} setUploadedThumbnail={setUploadedThumbnail}/>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" value={postInfo.title} onChange={(e)=>{changePostInfo("title",e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Topic</label>
                                <TopicDropdown topicOption={topics} setTopic={setTopic} topic={postInfo.topic}/>
                            </div>
                            {
                                user_login.is_member && (
                                    <div className="form-row">
                                        <div className="checkbox d-flex align-items-center">
                                            <input type="checkbox" id="remember" checked={postInfo.is_member_only} 
                                                onChange={(e)=>{changePostInfo("is_member_only",e.target.checked)}}/>
                                            <label htmlFor="remember">Make the post be member-only</label>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                postInfo?.status !== 1 && (
                                <  div className="form-group d-flex flex-column ">
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
                                )
                            }
                            
                            <div className="row col-12 d-flex justify-content-between m-0 p-0">
                                <button type="button" onClick={() => setDisplayModal(false)}
                                    className=" btn col-4 link-md rounded-1 button2 bg-white text-scheme-sub-text p-3">Cancel</button>
                                {
                                    postInfo?.status !== 1 && (
                                        <button type="submit" className="col-4 btn prim-btn rounded-1 button2 p-3 " 
                                            onClick={() => {saveChanges(2)}}>Schedule</button>
                                    )
                                }
                                <button type="submit" className="col-4 btn prim-btn rounded-1 button2 p-3 publish-btn" 
                                        style={postInfo?.status === 1 ? { flexGrow: 1 } : {}}
                                        onClick={() => {saveChanges(1)}}>Publish now</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
                )
            }
            {
                !loading && !notFound && (
                    <>
                        <Toolbar
                            handleDeleteButton={handleDeleteButton}
                            handleBackButton={handleBackButton}
                            handleSaveButton={handleSaveButton}
                            setDisplayModal={setDisplayModal}
                            id_post={id_post}
                            navigate={navigate}/>
                            {showEditor && (
                                <div className="container col-12 mt-3">
                                    <TextEditor content={postInfo.content} changePostInfo={changePostInfo}></TextEditor>
                                </div>
                            )}
                    </>
                )
            }
            {
                notFound && !loading && (
                    <NotFound/>
                )
            }
            {
                (loading || !showEditor) && (
                    <Loading/>
                )
            }
            
        </div>
    );
}

function ThumbnailDrop ({thumbnail, uploadedThumbnail, setUploadedThumbnail}) {
  
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setUploadedThumbnail(reader.result);
      };
  
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: 'image/jpeg, image/png',
        multiple: false, });

    const deleteUploadedThumbnail = (e) => {
        e.stopPropagation()
        setUploadedThumbnail(null)
    }

    return (
      <div {...getRootProps()} className="image-input-container d-flex align-items-center justify-content-center gap-3">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="p2 m-0 text-drag-and-drop">Drop the image here...</p> :
            <p className="p2 m-0 text-drag-and-drop text-center">Drag and drop an image here, or click to select an image</p>
        }
        {(thumbnail || uploadedThumbnail) && (
          <div className="image-preview position-relative">
            <i className="fa-solid fa-xmark close-button" onClick={deleteUploadedThumbnail}></i>
            <img src={uploadedThumbnail || thumbnail} alt="Selected" className="preview-image" />
          </div>
        )}
      </div>
    );
};

function TopicDropdown ({topicOption, topic, setTopic, maxOptions = 5}){
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
    // console.log(topic);
    // console.log(newTopic);
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

