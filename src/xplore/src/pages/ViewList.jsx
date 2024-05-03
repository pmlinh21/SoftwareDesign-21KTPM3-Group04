import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './ViewList.css';
import Search from '../components/search/Search';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/system-feedback/Loading';
import { userService } from '../services/UserService';



export default function ViewList(props) {
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_list = parseInt(searchParams.get('id_list'));
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState({});
    const [displayPopup, setDisplayPopup] = useState(false)
    const [listName, setListName] = useState('')

    const fetchList = async () => {
        try {
            const result = await userService.getPostByListId(id_list)
            if (result.status === 200) {
                console.log("list: ", result.data.content);
                setList(result.data.content);
                setListName(result.data.content.list_name);
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {  
        fetchList();
    }, []);

    const handleDeleteClicked = async () => {
        try {
            const result = await userService.deleteList(id_list);
            if (result.status === 200) {
                navigate("/list");
                alert("List deleted successfully");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    
    const handleEditClicked = () => { 
        setDisplayPopup(true);
    }

    const handleSaveClicked = async () => {
        try {
            const result = await userService.updateList({id_list: id_list, list_name: listName});
            if (result.status === 200) {
                setDisplayPopup(false);
                fetchList();
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className='view-list container-fluid'>
            <Search />
            <div className='my-4 py-2 list-title-container'>
                <div className='container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <button className='link-nm' onClick = {() => navigate("/list")} >
                            <i class="fa-solid fa-arrow-left"></i> Back
                        </button>
                        <p className='title1 p-0 m-0'>
                            {list?.list_name ? list.list_name : ""} {list?.saved_posts?.length >= 0 ? ` (${list.saved_posts.length})` : ""}
                        </p>
                        <div className="dropdown">
                            <i class="fa-solid fa-ellipsis ic" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li class="dropdown-item" onClick={handleEditClicked}>Edit list</li>
                                <li><hr className="dropdown-divider" ></hr></li>
                                <li class="dropdown-item delete-dropdown" onClick={handleDeleteClicked}>
                                    <i class="fa-regular fa-trash-can"></i> Delete
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
            {loading && <Loading />}

            {!loading && list.saved_posts.length > 0 &&
                <div className='d-flex flex-wrap justify-content-between gap-4'>
                    {list.saved_posts.map((post) => {
                        return <BlogCardHorizontal post={post} style={"view-list"}/>
                    })}
                </div>
            }

            {!loading && list.saved_posts.length === 0 &&
                <div className='empty-box text-center my-5 py-5'>
                    <img src='/imgs/empty-box.png' alt='empty-box' className='mt-5' />
                    <h6 className='text-scheme-sub-text mt-5'>This list is empty</h6>
                </div>
            }
                
            </div>

            { displayPopup && 
            <div className="edit-popup-overlay">
                <div className="edit-popup">
                    <i className="fa-solid fa-xmark close-button" onClick={()=>setDisplayPopup(false)}></i>
                
                    <p className="title1">
                        Edit List
                    </p>
                    <div className="form-group">
                        <label className="label2">List name</label>
                        <div className="d-flex">
                            <input type="text" name="list_name" value={listName} onChange={(e)=>setListName(e.target.value)}/>
                            <button className="prim-btn rounded-1 button2 px-3 ms-3" onClick={handleSaveClicked}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}