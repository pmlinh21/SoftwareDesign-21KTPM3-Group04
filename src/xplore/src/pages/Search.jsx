import React from 'react';
import "../styles/commons.css";
import "./Search.css"
import Navbar from '../components/navbar/Navbar'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate  = useNavigate();

    const [searchText, setSearchText] = useState("")

    function handleSearchButtonClick(){
        navigate(`/search-result?searchText=${searchText}`, { state: { user: 'abc' }})

    }

  return (
    <div className="search-page">
        <Navbar/>

        <div className="container">

            <div className="row mb-4">
                <h4>Made for you</h4>
            </div>

            <div className="row search-field p-2 rounded">
                <div className="d-flex justify-content-between">
                    <input 
                        id="search-input"
                        className="form-control p1 border-0"
                        placeholder="Typing something"
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        className="prim-btn btn-md rounded-circle"
                        onClick={handleSearchButtonClick}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
        </div>
        
    </div>
  );
}