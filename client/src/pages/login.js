import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");



    const handleUserLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and Password are required')
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response?.ok) {
                toast.error(data?.error || 'Something went wrong')
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setMessage(data?.message);
            setError("");
            toast.success('Login successful!');
            setEmail('');
            setPassword('');
            navigate("/show-posts");
        } catch (err) {
            setError(err.message);
            setMessage("");
            toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-custom flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-600 text-center mb-6">Login</h2>
                <form className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext text-white font-semibold py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleUserLogin}
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );

};

export default Login;
