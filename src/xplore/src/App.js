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
import Checkout from './pages/Checkout';
import Support from './pages/Support';
import About from './pages/About';
import AuthorProfile from './pages/AuthorProfile';
import MyTabs from './pages/MyTabs';
import PostDetail from './pages/PostDetail';
import Post from './pages/Post';
import ViewList from './pages/ViewList';
import Notification from './components/notification/Notification'

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
          <Route path="home" element={<Home />} />
          <Route path="topic" element={<ExploreTopic />} />
          <Route path="search-result" element={<SearchResult />} />

          <Route path="write" element={<Writing />} />

          <Route path="post" element={<PostDetail />}/>

          <Route path="my-profile" element={<MyProfile />} />
          <Route path='edit-profile' element={<EditProfile />}/>

          <Route path="list" element={<Library link="list"/>} />
          <Route path="list/detail" element={<ViewList />} />
          <Route path="highlight" element={<Library link="highlight"/>} />
          <Route path="response" element={<Library link="response"/>} />
          <Route path="history" element={<Library link="history"/>} />

          <Route path="pricing" element={<Pricing />}/>
          <Route path="checkout" element={<Checkout />}/>

          <Route path="support" element={<Support />}/>
          
          <Route path="about" element={<About />}/>

          <Route path="author-profile" element={<AuthorProfile/>}/>
          <Route path="ex" element={<MyTabs />}/>
          {/* <Route path="response" element={<Response />}/> */}
          <Route path="drafts" element={<Post />}/>
          {/* <Route path="noti" element={<Notification />}/> */}
        </Route>
      </Routes>
    </Router>
  );
}


export default App;