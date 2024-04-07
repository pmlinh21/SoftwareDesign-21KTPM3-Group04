import React, { useState } from 'react';
import "../styles/commons.css";
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import { RoleKey } from "../util/config";

import AuthorVertical from '../components/author-card/AuthorVertical';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    }

    return (
        <div className='container-fluid'>
            <section className="container">
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

            <div className="container">
                <Slider {...settings}>
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                    <AuthorVertical />
                </Slider>
            </div>
        </div>
    );
}

