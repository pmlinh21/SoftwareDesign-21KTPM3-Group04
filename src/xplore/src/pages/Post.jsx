import React, { useEffect,useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/search/Search';
import { getPostByUser } from "../redux/actions/PostAction";
//import BlogPostCard from '../components/blog-card/BlogPostCard';
import Avatar from "../components/avatar/Avatar"; 
import BookmarkIcon from "../components/icon/BookmarkIcon"
import { formatToMDY } from "../util/formatDate";
import { sanitizeContent } from "../util/formatText";
let props = {}
export default function Post(props) {
    const dispatch = useDispatch();
    const user_info = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    console.log("user_info: ", user_info)
    
    const author = {
        fullname: user_info.fullname, 
        avatar: user_info.avatar,
        id_user: user_info.id_user
    }
    
    const [tab, setTab] = useState('drafts');

    const user_post = useSelector(state => state.PostReducer.posts);

    useEffect(() => {
        dispatch(getPostByUser(author.id_user))

    }, [dispatch, author.id_user]);

    console.log("user_post: ", user_post)

    var draft_post;
    var published_post;
    //var userPostWithAuthor;

    if(user_post && user_post.length > 0){
        // userPostWithAuthor = user_post.map(post => ({
        //     ...post,
        //     author: {
        //         fullname: author.fullname,
        //         avatar: author.avatar,
        //         id_user: author.id_user
        //     }
        // }));

        const currentTime = new Date().getTime();
        draft_post = user_post.filter(post => {
            if (post.publish_time) {
                return new Date(post.publish_time).getTime() > currentTime;
            } else {
                return true; 
            }
        });
        
        published_post = user_post.filter(post => {
            if (post.publish_time) {
                return new Date(post.publish_time).getTime() <= currentTime;
            } else {
                return false;
            }
        });
        
        console.log("draft_post: ", draft_post)
        console.log("published_post: ", published_post)
    }
    else{
        draft_post = user_post
        published_post = user_post
    }
    return (
        <div className='container-fluid'>
            <Search />
            <div className='container'>
                <ul className='row tab-panel my-4'>
                    <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'drafts' ? 'focused' : ''}`} id="for-drafts" onClick={() => setTab('drafts')}>Drafts</li>
                    <li className={`col-3 no-margin-padding py-2 button2 tab-item ${tab === 'published' ? 'focused' : ''}`} id="for-published" onClick={() => setTab('published')}>Published</li>
                </ul>
                <div className='tab-content' id='drafts' style={{ display: tab === 'drafts' ? 'block' : 'none' }}>
                    <div className='d-flex flex-column gap-2'>
                        {draft_post && draft_post.length > 0 ? (
                            <div className="list-post row row-cols-3 gap-4">
                                {draft_post.map((post) => (
                                    // <BlogPostCard key={post.id_post} post={post} />
                                    <div className="blog-post-card d-flex flex-column p-0 m-0">
                                        <div className="thumbnail-container bg-white p-0 m-0 position-relative">
                                            <BookmarkIcon id_post={post.id_post} set_absolute={true}/>
                                            <img src={post.thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
                                        </div>
                                        
                                        {
                                            post.list_topic?.length > 0 ?
                                            (
                                                <div className="row col-12 m-0 mt-4 mb-2">
                                                    <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                                                        {post.list_topic[0]?.topic || "None"}
                                                    </p>
                                                </div>
                                            ) : 
                                            (
                                                <div className="row col-12 m-0 mt-4 mb-2">
                                                    <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                                                        None
                                                    </p>
                                                </div>
                                            )
                                        }
                                        <div className="col-12 title-block">
                                            <div className="row col-12 m-0 ">
                                                <h6 className="col-auto text-black m-0 p-0 title-text long-text mb-2">
                                                    {post.title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                                </h6>
                                            </div>

                                            <div className="row col-12 m-0 mb-3 p-0">
                                                <p className="p2 col-auto text-scheme-sub-text m-0 p-0 content-text long-text"
                                                dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) || "" }}>
                                                </p>
                                            </div>
                                        </div>
                                        
                            
                                        <div className="row col-12 d-flex align-items-center justify-content-between p-0 m-0 mt-2">
                                            <div className="col-8 d-flex align-items-center p-0">
                                                <div className="col-3">
                                                    <Avatar avatar={author?.avatar} size="small"/>
                                                </div>

                                                <div className="col-9 row d-flex flex-column align-items-start gap-1 ">
                                                    <p className="col-auto title2 text-black m-0 p-0">
                                                        {author?.fullname || "Author name"}
                                                    </p>
                                                    <p className="col-auto support text-scheme-sub-text m-0 p-0">
                                                        {(post.publish_time && formatToMDY(post.publish_time)) || "MMM DD, YYYY"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-4 link-sm m-0 p-0 d-flex justify-content-end">
                                                <Link to={`/write?id_post=${post.id_post}`}>Continue editing <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-box text-center my-5 py-5'>
                                <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                <h6 className='title2 text-scheme-sub-text mt-5'>You have 0 drafts</h6>
                            </div>
                        )}
                    </div>
                </div>

                <div className='tab-content' id='published' style={{ display: tab === 'published' ? 'block' : 'none' }}>
                    <div className='d-flex flex-column gap-2'>
                        {published_post && published_post.length > 0 ? (
                            <div className="list-post row row-cols-3 gap-4">
                                {published_post.map((post) => (
                                    // <BlogPostCard key={post.id_post} post={post} />
                                    <div className="blog-post-card d-flex flex-column p-0 m-0">
                                        <div className="thumbnail-container bg-white p-0 m-0 position-relative">
                                            <BookmarkIcon id_post={post.id_post} set_absolute={true}/>
                                            <img src={post.thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
                                        </div>
                                        
                                        {
                                            post.list_topic?.length > 0 ?
                                            (
                                                <div className="row col-12 m-0 mt-4 mb-2">
                                                    <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                                                        {post.list_topic[0]?.topic || "None"}
                                                    </p>
                                                </div>
                                            ) : 
                                            (
                                                <div className="row col-12 m-0 mt-4 mb-2">
                                                    <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                                                        None
                                                    </p>
                                                </div>
                                            )
                                        }
                                        <div className="col-12 title-block">
                                            <div className="row col-12 m-0 ">
                                                <h6 className="col-auto text-black m-0 p-0 title-text long-text mb-2">
                                                    {post.title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                                </h6>
                                            </div>

                                            <div className="row col-12 m-0 mb-3 p-0">
                                                <p className="p2 col-auto text-scheme-sub-text m-0 p-0 content-text long-text"
                                                dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) || "" }}>
                                                </p>
                                            </div>
                                        </div>
                                        
                            
                                        <div className="row col-12 d-flex align-items-center justify-content-between p-0 m-0 mt-2">
                                            <div className="col-8 d-flex align-items-center p-0">
                                                <div className="col-3">
                                                    <Avatar avatar={author?.avatar} size="small"/>
                                                </div>

                                                <div className="col-9 row d-flex flex-column align-items-start gap-1 ">
                                                    <p className="col-auto title2 text-black m-0 p-0">
                                                        {author?.fullname || "Author name"}
                                                    </p>
                                                    <p className="col-auto support text-scheme-sub-text m-0 p-0">
                                                        {(post.publish_time && formatToMDY(post.publish_time)) || "MMM DD, YYYY"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-4 link-sm m-0 p-0 d-flex justify-content-end">
                                                <Link to={`/write?id_post=${post.id_post}`}>Continue editing <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-box text-center my-5 py-5'>
                                <img src='./imgs/empty-box.png' alt='empty-box' className='mt-5' />
                                <h6 className='title2 text-scheme-sub-text mt-5'>You have 0 published posts</h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
)};
