import React from 'react';
import "../styles/commons.css";
import "./SearchResult.css"
import Search from '../components/search/Search'
import BlogPostCard from '../components/blog-card/BlogPostCard'
import TopicTag from '../components/topic/TopicTag'

import { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux'
import { useNavigate, useLocation   } from 'react-router-dom';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import Loading from '../components/loading/Loading';

