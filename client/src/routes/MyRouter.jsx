import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import { Signup, Login, ShowPosts, ShowMyPosts, PostPage } from '../pages';
import PrivateLayoutRoutes from "./PrivateLayoutRoutes";


const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<PrivateLayoutRoutes />}>
                    <Route path="/" element={<ShowPosts />} />
                    <Route path="/create-post" element={<PostPage />} />
                    <Route path="/show-posts" element={<ShowPosts />} />
                    <Route path="/show-my-posts" element={<ShowMyPosts />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default MyRouter;