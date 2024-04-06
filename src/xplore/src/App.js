import './App.css';
import BlogCard from './components/blog-card/BlogCard';
import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux';
import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from './components/navbar/Navbar'; // Import your Navbar component
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Writing from './pages/Writing';

export const history = createBrowserHistory();

function Layout() {
  return (
<<<<<<< HEAD
    // <Router>
    //     <div className="App">
    //         <Nav />
    //         <Routes>
    //             <Route path="/" element={<Home />} />
    //             <Route path="/tweets" element={<Tweet />} />
    //         </Routes>
    //     </div>
    // </Router>
    <div className="App">
        <Navbar />
        <Home />
=======
    <div>
      <Navbar />
      <Outlet />
>>>>>>> f2c5ac56f93f18e69406904539f360310ddf108a
    </div>
  );
}

// Define route in Route Layout to use navbar

function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="" element={<Layout />}>
          
          <Route path="" element={<Home />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="write" element={<Writing />} />
        </Route>

        <Route path="login" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}


export default App;