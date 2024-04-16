import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux';
import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomeGuest from './pages/HomeGuest';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Writing from './pages/Writing';
import MyProfile from './pages/MyProfile';
import ExploreTopic from './pages/ExploreTopic';

export const history = createBrowserHistory();

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

// Define route in Route Layout to use navbar

function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="" element={<Layout />}>
          
          <Route path="" element={<HomeGuest />} />
          <Route path="topic" element={<ExploreTopic />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="write" element={<Writing />} />
<<<<<<< HEAD
          <Route path="my-profile" element={<MyProfile />} />

=======
>>>>>>> 525efc09f75061464f64d905d85d4d0cb1b79ac8
        </Route>

        <Route path="login" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}


export default App;