import './App.css';
import BlogCard from './components/blog-card/BlogCard';
import Navbar from './components/navbar/Navbar';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
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
    </div>
  );
}

export default App;
