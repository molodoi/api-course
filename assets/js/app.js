import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

const App = () => {

    return (
        <HashRouter>
            <Navbar />
            <main className="container pt-5">
                <Switch>
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);