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
                    <p className='subtitle1' style={{color: 'var(--scheme-primary)',
    textAlign: 'center'}}>ABOUT US</p>
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
                                    <h3 style={{color: 'var(--blue-500)'}}>400+</h3>
                                    <p className='p1'>Projects completed</p>
                                </div>
                                <div className='col'>
                                    <h3 style={{color: 'var(--blue-500)'}}>100%</h3>
                                    <p className='p1'>Return on investment</p>
                                </div>
                            </div>
                            <div className='row g-4'>
                            <div className='col'>
                                    <h3 style={{color: 'var(--blue-500)'}}>10K</h3>
                                    <p className='p1'>Global downloads</p>
                                </div>
                                <div className='col'>
                                    <h3 style={{color: 'var(--blue-500)'}}>200+</h3>
                                    <p className='p1'>5-star reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Partners*/}
            <div className='container-fluid partners-info'>
                <p className='label1' style={{textAlign: 'center'}}>Join 4,000+ companies already growing</p>
                <div className='container'>
                    <div className='row g-4' style={{margin: '32px 0'}}>
                        <div className='col'><img src='/imgs/about-layers.svg'></img></div>
                        <div className='col'><img src='/imgs/about-sisyphus.svg'></img></div>
                        <div className='col'><img src='/imgs/about-circooles.svg'></img></div>
                        <div className='col'><img src='/imgs/about-catalog.svg'></img></div>
                        <div className='col'><img src='/imgs/about-quotient.svg'></img></div>
                    </div>
                </div>
            </div>
            {/*Team*/}
            <div className='container-fluid team-info' style={{textAlign: 'center'}}>
                <p className='label1'>We are hiring</p>  
                <h4>Meet our team</h4>
                <p className='p1' style={{color: 'var(--scheme-sub-text'}}>Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do you best work.</p>
                <div className='about-buttons justify-content-center'>
                    <button className='tert-btn btn-md'>Learn more</button>
                    <button className='prim-btn btn-md'>Contact us</button>
                </div>
                <div className='container' style={{marginTop: '64px'}}>
                    <div className='row' style={{gap: '32px'}}>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-1.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Olivia Rhye</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Founder & CEO</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-2.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Phoenix Baker</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Engineering Manager</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-3.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Lana Steiner</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Product Manager</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-4.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Demi Wilkinson</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Frontend Developer</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{gap: '32px', marginTop: '64px'}}>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-5.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Candice Wu</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Backend Developer</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-6.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Natali Craig</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Product Designer</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-7.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Drew Cano</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>UX Researcher</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                        <div className='col team-container'>
                            <img src='/imgs/Avatar-8.svg'></img>
                            <p className='button1' style={{margin: '20px 0 0 0'}}>Orlando Diggs</p>
                            <p className='p2' style={{color: 'var(--scheme-primary)', margin: '0 0 8px 0'}}>Customer Success</p>
                            <p className='p2' style={{color: 'var(--scheme-sub-text)'}}>Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
                            <div className='social-media-btns justify-content-center'>
                                <img src="/imgs/x-logo.svg"/>
                                <img src="/imgs/linkedin-logo.svg"/>
                                <img src="/imgs/dribbble-logo.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;