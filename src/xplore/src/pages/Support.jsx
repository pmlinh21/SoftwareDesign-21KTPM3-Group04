import React, { useState, useEffect } from 'react';
import "../styles/commons.css"

export default function Support() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
        <div className="container-fluid">
            <div className='container' style={{ padding: '72px 0' }}>
                <p className='subtitle1' style={{ color: 'var(--scheme-primary)', textAlign: 'center' }}>FAQS</p>
                <h4 style={{ textAlign: 'center' }}>Ask us anything</h4>
                <p className='p1 subtext'>Need something cleared up? Here are our most frequently asked questions.</p>
            </div>
        </div>

        <div className="container-fluid" style={{background: 'var(--blue-0)', padding: '96px'}}>
            <div className="container">
                <div className="d-flex flex-row gap-4">
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                            Is there a free trial available?
                        </p>
                        <p className="p1 m-0">Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                    </div>
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon-1.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                            Can I change my plan later?
                        </p>
                        <p className="p1 m-0">Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.</p>
                    </div>
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon-2.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                        What is your cancellation policy?
                        </p>
                        <p className="p1 m-0">We understand that things change. You can cancel your plan at any time and we’ll refund you the difference already paid.</p>
                    </div>
                </div>
                <div className="d-flex flex-row gap-4 my-5">
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon-3.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                            Can other info be added to an invoice?
                        </p>
                        <p className="p1 m-0">Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.</p>
                    </div>
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon-4.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                            How does billing work?
                        </p>
                        <p className="p1 m-0">Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.</p>
                    </div>
                    <div className="col d-flex flex-column gap-3">
                        <img src="/imgs/Featured icon-5.png" style={{width: '48px'}}/>
                        <p className="title2 m-0">
                        How do I change my account email?
                        </p>
                        <p className="p1 m-0">You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between" style={{ background: 'white', borderRadius: '16px', padding: '32px'}}>
                    <div className="d-flex flex-column">
                        <p className="title2 m-0">Still have questions?</p>
                        <p className="p1 m-0">Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                    </div>
                    <button className="prim-btn btn-md">Get in touch</button>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="container d-flex flex-row align-items-center gap-5">
                <div className="col d-flex flex-column" style={{ padding: '96px 0'}}>
                    <h4>Contact us</h4>
                    <p className="p1">Our friendly team would love to hear from you.</p>
                    <form onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label className='label2 my-2' htmlFor="name">Full name</label>
                            <input 
                                type="text" 
                                className="form-control" id="fullName" 
                                value={fullName}
                                placeholder='Enter your full name'
                                onChange={(e) => setFullName(e.target.value)}
                                />
                        </div>
                        <div className='my-3'>
                            <label className='label2 my-2' htmlFor="name">Email</label>
                            <input 
                                type="text" 
                                className="form-control" id="email" 
                                value={email}
                                placeholder='Enter your email address'
                                onChange={(e) => setFullName(e.target.value)}
                                />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="textarea" className='label2'>Message</label><br></br>
                            <textarea
                                id="textarea"
                                value={text}
                                onChange={handleChange}
                                rows={4}
                                cols={85}
                                placeholder="How can we help you?"
                                style={{ resize: 'vertical' }}
                            />
                        </div>
                        <button className='prim-btn btn-md' style={{width: '100%'}}>Send message</button>
                    </form>
                </div>
                <div className="col"><img src="/imgs/contact.jpg" style={{width: '100%'}} /></div>
            </div>
        </div>  

        </div>
    )
}