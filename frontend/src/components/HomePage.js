import React, { Component } from "react";
import InfoUsers from "./InfoUsers";
import PublishExcuses from "./PublishExcuses";
import Home from "./Home";
import RandomExcuse from "./RandomExcuse";
import { Info } from "./Info";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (       
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/publish" element={<PublishExcuses />} />
                <Route path="/user/:users" element={<InfoUsers />} />
                <Route path="/random" element={<RandomExcuse />} />
                <Route path="/info" element={<Info />} />
            </Routes>
        </Router>);
    }
}