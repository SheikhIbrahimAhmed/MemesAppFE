import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShowMemes, MemePostPage } from '../pages';
import Navbar from "../components/navbar"
import HomePage from "../pages/HomePage";

const MyRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/view-memes" element={<ShowMemes />} />
                <Route path="/post-memes" element={<MemePostPage />} />
            </Routes>
        </Router>
    );
};

export default MyRouter;