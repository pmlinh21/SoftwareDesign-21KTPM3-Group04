import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Writing from './pages/Writing';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
        <Routes>
              
          <Route path = "/" element = {<Home/>} />

          <Route path = "/search-result" element = {<SearchResult/>} />

          <Route path = "/write" element = {<Writing/>} />
        </Routes>
    </Router>
  );
}

export default App;
