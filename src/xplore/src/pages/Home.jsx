import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import "../styles/commons.css";

import Search from '../components/search/Search';

export default function Home() {

    return (
        <div className='container-fluid my-4'>
            <div className="container my-5 gradient-bg">
                <Search />
            </div>
        </div>
    );
}

