import React, { useEffect,useState } from 'react';
import "./Library.css";
import Search from '../components/search/Search';


export default function Library() {
    const [tab, setTab] = React.useState('reading');

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
    

    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    <li className='col-3 py-2 button2 text-scheme-sub-text tab-item focused' id="for-reading">Reading</li>
                    <li className='col-3 py-2 button2 text-scheme-sub-text tab-item' id="for-saved">Saved</li>
                    <li className='col-3 py-2 button2 text-scheme-sub-text tab-item' id="for-highlight">Highlight</li>
                    <li className='col-3 py-2 button2 text-scheme-sub-text tab-item' id="for-history">History</li>
                </ul>

                <div className="tab-content" id="reading">
                    <div className="empty-box text-center my-5 py-5">
                        <img src="./imgs/empty-box.png" alt="empty-box" />
                        <h6 className='text-scheme-sub-text mt-5'>You are reading 0 posts</h6>
                    </div>
                </div>
                <div className="tab-content" id="saved">
                    <div className="empty-box text-center my-5 py-5">
                        <img src="./imgs/empty-box.png" alt="empty-box" />
                        <h6 className='text-scheme-sub-text mt-5'>You saved 0 posts</h6>
                    </div>
                </div>
                <div className="tab-content" id="highlight">
                    <div className="empty-box text-center my-5 py-5">
                        <img src="./imgs/empty-box.png" alt="empty-box" />
                        <h6 className='text-scheme-sub-text mt-5'>You have 0 highlights</h6>
                    </div>
                </div>
                <div className="tab-content" id="history">
                    <div className="empty-box text-center my-5 py-5">
                        <img src="./imgs/empty-box.png" alt="empty-box" />
                        <h6 className='text-scheme-sub-text mt-5'>You read 0 posts</h6>
                    </div>
                </div>
            </div>
        </div>
)};