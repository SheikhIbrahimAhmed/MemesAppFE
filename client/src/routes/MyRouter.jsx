import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import { Signup, Login, ShowMemes, ShowMyMemes, MemePostPage } from '../pages';
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
                    <Route path="/post-meme" element={<MemePostPage />} />
                    <Route path="/show-memes" element={<ShowMemes />} />
                    <Route path="/show-my-memes" element={<ShowMyMemes />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default MyRouter;