import React, { useEffect,useState } from 'react';
import './Library.css';
import { Link } from 'react-router-dom';
import Search from '../components/search/Search';
import BlogPostCard from '../components/blog-card/BlogPostCard';


export default function Library(props) {
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
    });

    const tabs = [
        { id: 'for-reading', name: 'Reading' },
        { id: 'for-saved', name: 'Saved' },
        { id: 'for-highlight', name: 'Highlight' },
        { id: 'for-history', name: 'History' },
    ];

    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    {tab == "reading" ? <Link to="/reading" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-reading" >Reading</li></Link> : <Link to="/reading" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-reading" >Reading</li></Link>}
                    {tab == "saved" ? <Link to="/saved" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-saved" >Saved</li></Link> : <Link to="/saved" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-saved" >Saved</li></Link>}
                    {tab == "highlight" ? <Link to="/highlight" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-highlight" >Highlight</li></Link> : <Link className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-highlight" >Highlight</li></Link>}
                    {tab == "history" ? <Link to="/history" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item focused' id="for-history" >History</li></Link> : <Link to="/history" className="col-3 no-margin-padding"><li className='py-2 button2 tab-item' id="for-history" >History</li></Link>}
                </ul>

                <div className='tab-content' id='reading'>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You are reading 0 posts</h6>
                    </div>

                    <div className='row justify-content-between'>
                        <BlogPostCard />
                        <BlogPostCard />
                        <BlogPostCard />
                    </div>
                </div>
                <div className='tab-content' id='saved'>
                    <div className='empty-box text-center my-5 py-5'>
                        <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                        <h6 className='text-scheme-sub-text mt-5'>You saved 0 posts</h6>
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
