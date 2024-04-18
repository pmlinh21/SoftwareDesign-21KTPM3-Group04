import { useState, useEffect, useRef } from 'react';
import { useNavigate, redirect   } from 'react-router-dom';
import React from 'react';
import "../../styles/commons.css";
import "./Search.css"


export default function Search({search, isResult}){
    const navigate  = useNavigate();

    const [searchText, setSearchText] = useState(search || "")
    const [displaySearchOption, setDisplaySearchOption] = useState(false)
    const [recentSearch, setRecentSearch] = useState([])

    const searchSectionRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchSectionRef.current && !searchSectionRef.current.contains(event.target)) {
                setDisplaySearchOption(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        const userRecentSearch = localStorage.getItem('userRecentSearch');
        if (userRecentSearch) {
            setRecentSearch(userRecentSearch.split("\\n"));
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };


    }, [searchSectionRef]);

    function updateRecentSearch(search){
        let newRecentSearch

        if (!recentSearch.includes(search)) {
             newRecentSearch = [search, ...recentSearch]

        } else{
            const index = recentSearch.indexOf(search);
            newRecentSearch = [...recentSearch]
            newRecentSearch.splice(index, 1)
            newRecentSearch = [search, ...newRecentSearch]
        }

        localStorage.setItem('userRecentSearch', newRecentSearch.join("\\n"));
        setRecentSearch(newRecentSearch)
    }

    function handleSearchButtonClick(type, search = searchText){
        if (search){
            setDisplaySearchOption(false)
            setSearchText(search)
            updateRecentSearch(search)
            navigate(`/search-result?type=${type}&searchText=${search}`)
            
        }
        else
            alert("Please enter some keyword")

    }

    function handleSearchDeleteClick(event ,index){
        event.stopPropagation()

        const newRecentSearch = [...recentSearch]
        newRecentSearch.splice(index, 1)
        localStorage.setItem('userRecentSearch', newRecentSearch.join("\\n"));
        setRecentSearch(newRecentSearch)
    }

    function handleKeyDown(e){
        if (e.key === "Enter") {
            handleSearchButtonClick("all")
        }
    }

    return(
        <div className="container search-container position-relative mt-4">
            <div className="container search-section"
            ref={searchSectionRef}>
                <div className="row pe-0">
                    <div className="col-12 search-bar p-2 rounded bg-blue-50">
                        <div className="d-flex justify-content-between">
                            <input 
                                id="search-input"
                                className="form-control border-0 bg-blue-50 p1 text-scheme-main-text"
                                placeholder="Typing something"
                                type="text"
                                autoComplete="off"
                                value={searchText}
                                onKeyDown={handleKeyDown}
                                onMouseDown={() => setDisplaySearchOption(true)}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button 
                                className="prim-btn btn-md rounded-circle"
                                onClick={() => {handleSearchButtonClick("all")}}>
                                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

            {
                (displaySearchOption || (searchText !== "" && !isResult))  &&
                <div className="row col-12 search-dropdown py-4 mt-2 rounded bg-blue-50">
                    <div className="row ms-2">
                        <p className="subtitle2 text-neutral-400">SEARCH BY</p>
                    </div>
                    <div className="row px-4 ms-2 mb-4 mt-2 d-flex gap-2">
                        <button 
                            className="col-auto btn btn-sm rounded-pill bg-black title2 text-white "
                            onClick={() => {handleSearchButtonClick("all")}}>
                            All
                        </button>
                        <button 
                            className="col-auto btn btn-sm rounded-pill bg-neutral-50 title2  text-black"
                            onClick={() => {handleSearchButtonClick("post")}}>
                            Post
                        </button>
                        <button 
                            className="col-auto btn btn-sm rounded-pill bg-neutral-50 title2 text-black"
                            onClick={() => {handleSearchButtonClick("topic")}}>
                            Topic
                        </button>
                        <button 
                            className="col-auto btn btn-sm rounded-pill bg-neutral-50 title2 text-black"
                            onClick={() => {handleSearchButtonClick("user")}}>
                            Author
                        </button>
                    </div>
                    <div className="row m-2">
                        <p className="subtitle2 text-neutral-400">RECENT SEARCHES</p>
                    </div>
                    {
                        recentSearch?.map((item, index) => {
                            return (
                                <div key={item} className="search-recent row d-flex justify-content-between align-items-center bg-blue-50 mx-0 py-1 ps-3"
                                    onClick={() => {
                                        handleSearchButtonClick("all", item)
                                    }}
                                >
                                    <p className="col-auto title1 text-black d-block mb-0 ps-3">{item}</p>
                                    <button 
                                        className="col-auto btn btn-sm text-black"
                                        onClick={(e)=>{handleSearchDeleteClick(e,index)}}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    
                                </div>
                            )
                        })
                    }
                    
                </div>
          
            }

            </div>

        {
            (displaySearchOption || (searchText !== "" && !isResult))  &&
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50"></div>
          
        }    
        </div>
    )
}