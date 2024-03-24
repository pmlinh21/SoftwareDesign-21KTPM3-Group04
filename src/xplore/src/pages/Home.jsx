import React from 'react';
import "../styles/commons.css";

export default function Home() {
  return (
    <div className="container-fluid grid">
        <section className="container-sm col-6 grid">
            <div className="row my-10">
                <h1 className="text-center col">The world's destination for avid readers</h1>
            </div>
            <div className="row my-5">
                <p className="p1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="row my-5">
                <div className="gap-3 d-flex justify-content-center">
                    <button className="button1 btn-nm sec-btn">Get started</button>
                    <button className="button1 btn-nm prim-btn">
                        <i className="fa-solid fa-book-open"></i> Learn more
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
}