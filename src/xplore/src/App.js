import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
        <Routes>
              
          <Route path = "/" element = {<Home/>} />

          <Route path = "/search" element = {<Search/>} />
          <Route path = "/search-result" element = {<SearchResult/>} />
        </Routes>
    </Router>
  );
}

export default App;
