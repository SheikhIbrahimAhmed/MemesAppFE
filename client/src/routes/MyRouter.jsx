import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShowMemes, MemePostPage } from '../pages';
import Navbar from "../components/navbar"

const MyRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ShowMemes />} />
                <Route path="/post-meme" element={<MemePostPage />} />
            </Routes>
        </Router>
    );
};

export default MyRouter;