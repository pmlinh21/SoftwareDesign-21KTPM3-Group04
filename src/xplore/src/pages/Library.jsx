import React, { useEffect,useState } from 'react';
import './Library.css';
import { Link } from 'react-router-dom';
import Search from '../components/search/Search';
import BlogPostCard from '../components/blog-card/BlogPostCard';
import ListCard from '../components/list-card/ListCard';
import {postService} from '../services/PostService';


export default function Library(props) {
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    
    const author = {
        fullname: user_info.fullname, 
        avatar: user_info.avatar,
        id_user: user_info.id_user
    }
    const [myPosts, setMyPosts] = useState([]);
    const [mySavedLists, setMySavedLists] = useState([]);
    const [myHighlights, setMyHighlights] = useState([]);
    const [myHistory, setMyHistory] = useState([]);

    const [tab, setTab] = React.useState(props.link);

    useEffect(() => {

        const tabItems = document.querySelectorAll('.tab-item');
        const tabContent = document.querySelectorAll('.tab-content');

        tabItems.forEach((item) => {
            item.addEventListener('click', () => {
                tabItems.forEach((item) => {
                    item.classList.remove('focused');
                });
                item.classList.add('focused');
                setTab(item.id.replace('for-', ''));
            });
        });

        tabContent.forEach((content) => {
            if (content.id === tab) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });

        fetchMyPosts();
    });

    const tabs = [
        { id: 'for-reading', name: 'Reading' },
        { id: 'for-list', name: 'List' },
        { id: 'for-highlight', name: 'Highlight' },
        { id: 'for-history', name: 'History' },
    ];

    const fetchMyPosts = async () => {
        try {
            if (!user_info) return;

            const result = await postService.getPostByUser(user_info.id_user);
            if (result.status === 200) {
                setMyPosts(result.data.content);
                console.log(myPosts[0])
            }
        } catch (error) {
            console.log("error", error);
        }
    };



    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    {tab === "reading" ? <Link to="/reading" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-reading" >Reading</li></Link> : <Link to="/reading" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-reading" >Reading</li></Link>}
                    {tab === "list" ? <Link to="/list" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-list" >List</li></Link> : <Link to="/list" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-list" >List</li></Link>}
                    {tab === "highlight" ? <Link to="/highlight" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-highlight" >Highlight</li></Link> : <Link className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-highlight" >Highlight</li></Link>}
                    {tab === "history" ? <Link to="/history" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-history" >History</li></Link> : <Link to="/history" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-history" >History</li></Link>}
                </ul>

                <div className='tab-content' id='reading'>

                {myPosts.length > 0 ? 
                    <div className='d-flex flex-wrap justify-content-between gap-4'>
                        {myPosts.map((post, index) => {
                            return <BlogPostCard post={post} author={author} />
                        })}
                    </div>
                    :
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You are reading 0 posts</h6>
                    </div>
                }
                    
                </div>
                <div className='tab-content' id='list'>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 lists</h6>
                    </div>

                    <div className='row d-flex flex-row flex-wrap justify-content-between gap-3'>
                        <ListCard />
                        <ListCard />
                        <ListCard />
                        <ListCard />
                    </div>
                </div>
                <div className='tab-content' id='highlight'>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5'/>
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 highlights</h6>
                    </div>
                </div>
                <div className='tab-content' id='history'>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You read 0 posts</h6>
                    </div>
                </div>
            </div>
        </div>
)};
