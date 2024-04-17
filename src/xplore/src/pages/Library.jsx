import React from 'react';
import Search from '../components/search/Search';


export default function Library() {
    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Library</h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <h2>My Library</h2>
                    </div>
                    </div>  
            </div>
        </div>
)};