import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "../styles/commons.css";
import "./About.css";

function About() {
    return (
        <div>
            {/*Headline*/}
            <div className='container-fluid'>
                <div className='container' style={{padding: '72px 0'}}>
                    <p className='subtitle1'>ABOUT US</p>
                    <h4 style={{textAlign: 'center'}}>About the company</h4>
                    <p className='p1 subtext'>Learn more about the company and the team behind it.</p>
                </div>
            </div>
            {/*About*/}
            <div className='container-fluid about-info'>
                <div className='container'>
                    <div className='row g4'>
                        <div className='col' style={{marginRight: '96px'}}>
                            <img src='/imgs/about-company.png' id='company-img'></img>
                        </div>
                        <div className='col'>
                            <p className='label1'>We’ve helped hundreds of companies</p>
                            <h4>We’re only just getting started on our journey</h4>
                            <div className='row g-4' style={{margin: '64px 0'}}>
                                <div className='col'>
                                    <h2 style={{color: 'var(--blue-500)'}}>400+</h2>
                                    <p className='p1'>Projects completed</p>
                                </div>
                                <div className='col'>
                                    <h2 style={{color: 'var(--blue-500)'}}>100%</h2>
                                    <p className='p1'>Return on investment</p>
                                </div>
                            </div>
                            <div className='row g-4'>
                            <div className='col'>
                                    <h2 style={{color: 'var(--blue-500)'}}>10K</h2>
                                    <p className='p1'>Global downloads</p>
                                </div>
                                <div className='col'>
                                    <h2 style={{color: 'var(--blue-500)'}}>200+</h2>
                                    <p className='p1'>5-star reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Partners*/}
            <div className='container-fluid'>
                
            </div>
        </div>
    )
}
export default About;