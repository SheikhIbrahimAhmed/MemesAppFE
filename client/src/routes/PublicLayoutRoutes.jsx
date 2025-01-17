import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from 'axios';

const PublicLayoutRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const checkToken = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await axios.get("http://localhost:5000/validate-token", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    navigate("/");
                }
            } catch (err) {
                console.log(err?.message);
            }
        };
        checkToken();
    }, [navigate]);

    return (
        <>
            <Outlet />
        </>
    );
};


export default PublicLayoutRoutes;
