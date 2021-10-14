import React, { useState } from "react";
import ReactDOM from "react-dom";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

// start the Stimulus application
// import './bootstrap';
console.log('Hello World!!!');

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container pt-5">
                <HomePage />
            </div>
        </>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);