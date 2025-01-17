import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';

const PrivateLayoutRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const checkToken = async () => {
            if (!token) {
                toast.error("Unauthorized User");
                navigate("/login");
                return;
            }
            try {
                const response = await axios.get("http://localhost:5000/validate-token", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status !== 200) {
                    toast.error("Invalid token. Please log in again.");
                    navigate("/login");
                    return;
                }
            } catch (err) {
                localStorage.removeItem("token");
                console.log(err.message);
            }
        };
        checkToken();
    }, [navigate]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};


export default PrivateLayoutRoutes;
