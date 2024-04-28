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
import EditProfile from './pages/EditProfile';
import Library from './pages/Library';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import About from './pages/About';
import AuthorProfile from './pages/AuthorProfile';

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
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="home" element={<Home />} />
          <Route path='edit-profile' element={<EditProfile />}/>
          <Route path="reading" element={<Library link="reading" />} />
          <Route path="saved" element={<Library link="saved"/>} />
          <Route path="highlight" element={<Library link="highlight"/>} />
          <Route path="history" element={<Library link="history"/>} />
          <Route path="pricing" element={<Pricing />}/>
          <Route path="support" element={<Support />}/>
          <Route path="about" element={<About />}/>
          <Route path="author-profile" element={<AuthorProfile />}/>
        </Route>
      </Routes>
    </Router>
  );
}


export default App;