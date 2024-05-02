import React, { useEffect,useState } from 'react';
import './Library.css';
import { Link } from 'react-router-dom';
import Search from '../components/search/Search';
import BlogPostCard from '../components/blog-card/BlogPostCard';
import ListCard from '../components/list-card/ListCard';
import Loading from '../components/loading/Loading';
import { userService } from '../services/UserService';

export default function Library(props) {
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [loadingSavedLists, setLoadingSavedLists] = useState(true);
    const [loadingResponse, setLoadingResponse] = useState(true);
    const [loadingHighlights, setLoadingHighlights] = useState(true);
    
    const [myHistory, setMyHistory] = useState([]);
    const [mySavedLists, setMySavedLists] = useState([]);
    const [myResponses, setMyResponses] = useState([]);
    const [myHighlights, setMyHighlights] = useState([]);

    const [tab, setTab] = useState(props.link);

    const fetchMyHistory = async () => {
        try {
            if (!user_info) return;

            const result = await userService.getReadingHistory(user_info.id_user);
            if (result.status === 200) {
                setLoadingHistory(false);
                setMyHistory(result.data.content);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchMySavedLists = async () => {
        try {
            if (!user_info) return;

            const result = await userService.getAuthorList(user_info.id_user)
            if (result.status === 200) {
                setLoadingSavedLists(false);
                setMySavedLists(result.data.content);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        fetchMyHistory();
        fetchMySavedLists();
    }, []);

    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    <Link to="/list" className="col-3 no-margin-padding">
                        <li className={`py-2 button2 tab-item ${tab === "list" ? "focused" : ""}`} id="for-list" onClick={() => setTab('list')}>List</li>
                    </Link>

                    <Link to="/highlight" className="col-3 no-margin-padding">
                        <li className={`py-2 button2 tab-item ${tab === "highlight" ? "focused" : ""}`} id="for-highlight" onClick={() => setTab('highlight')}>Highlight</li>
                    </Link>

                    <Link to="/response" className="col-3 no-margin-padding">
                        <li className={`py-2 button2 tab-item ${tab === "response" ? "focused" : ""}`} id="for-response" onClick={() => setTab('response')}>Response</li>
                    </Link>

                    <Link to="/history" className="col-3 no-margin-padding">
                        <li className={`py-2 button2 tab-item ${tab === "history" ? "focused" : ""}`} id="for-history" onClick={() => setTab('history')}>History</li>
                    </Link>
                </ul>
                <div className='tab-content' id='list' style={{ display: `${tab === 'list' ? 'block' : 'none'}` }}>

                {loadingSavedLists && <Loading />}

                {!loadingSavedLists && mySavedLists.length > 0 &&
                    <div className='d-flex flex-wrap justify-content-between gap-4'>
                        {mySavedLists.map((list) => {
                            return <ListCard list={list} author={user_info} width={"half"}/>
                        })}
                    </div>
                }

                {!loadingSavedLists && mySavedLists.length === 0 &&
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 lists</h6>
                    </div>
                }
                </div>

                <div className='tab-content' id='highlight' style={{ display: `${tab === 'highlight' ? 'block' : 'none'}` }}>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5'/>
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 highlights</h6>
                    </div>
                </div>

                <div className='tab-content' id='response' style={{ display: `${tab === 'response' ? 'block' : 'none'}` }}>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5'/>
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 responses</h6>
                    </div>
                </div>

                <div className='tab-content' id='history' style={{ display: `${tab === 'history' ? 'block' : 'none'}` }}>

                {loadingHistory &&  <Loading/>}

                {!loadingHistory && myHistory.length > 0 &&
                    <div className='d-flex flex-wrap justify-content-between'>
                        {myHistory.map((post) => {
                            return <BlogPostCard post={post.id_post_post} />
                        })}
                    </div>
                }               

                {!loadingHistory && myHistory.length === 0 &&
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You read 0 posts</h6>
                    </div>
                }
                </div>
            </div>
        </div>
)};
