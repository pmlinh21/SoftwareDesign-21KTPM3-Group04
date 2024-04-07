import React, { useState } from 'react';
// import { UserService } from '../services/UserService';

import "../styles/commons.css";
import AuthorVertical from '../components/author-card/AuthorVertical';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';

export default function Home() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true
    }

    // const userService = new UserService();
    // const authors = [];
    // for (let i = 1; i < 10; i++) {
    //     authors.push(userService.getUserById(i));
    //     console.log(authors);
    // }

    return (
        <div className='container-fluid'>
            <section className="container my-5">
                <div className="row my-5  d-flex justify-content-center">
                    <h1 className="text-center col-8">The world's destination for avid readers</h1>
                </div>
                <div className="row my-5 d-flex justify-content-center">
                    <p className="p1 text-justify col-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="my-5 d-flex justify-content-center">
                    <button className="button1 btn-nm prim-btn" >
                        Explore now
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </section>

            <section className="container my-5">
                {/* <Slider {...settings}>
                    {authors.map((author, index) => (
                        <AuthorVertical key={index} author={author} />
                    ))}
                </Slider> */}

                <Slider {...settings}>
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                </Slider>
            </section>

            <section className="container my-5">
                <h4>
                    <i class="fa-solid fa-chart-line"></i> Trending on Xplore
                </h4>
            </section>

            <section className="container my-5">
                <div className="row">
                    <div className="col-7 me-5">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4>Explore more</h4>
                            <Link to="#" className="link-nm button1">
                                See all posts <i class="fa-solid fa-check"></i>
                            </Link>
                        </div>

                        <div className="d-flex flex-column gap-2">
                            <BlogCardHorizontal />
                            <BlogCardHorizontal />
                            <BlogCardHorizontal />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row mb-5">
                            <h4>Hot topics</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                                <button className="topic title1">Technology</button>
                            </div>
                            <button className="link-nm button1 d-flex justify-content-start gap-1 align-items-center mt-4">
                                See all topics <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                        <div className="row">
                            <h4>Who to follow</h4>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

