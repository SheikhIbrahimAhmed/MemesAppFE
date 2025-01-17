import React, { useState } from "react";
import '../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";


const Signup = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);



    const handleAddUser = async (event) => {
        event.preventDefault();
        console.log("uploadedFilePath", uploadedFilePath)
        if (!uploadedFilePath) {
            toast.error("Please upload a profile image first.");
            return;
        }
        const userData = {
            name,
            email,
            password,
            profileImage: uploadedFilePath,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/auth/create-user', userData);


            if (response.status !== 200) {
                console.log("Status not OK")
                throw new Error('Failed to create user');
            }

            setUsers((prevUsers) => [...prevUsers, response.data.user]);
            setName('');
            setEmail('');
            setPassword('');
            setUploadedFilePath('')
            setSelectedImage(null)
            toast.success("User added successfully!");
        } catch (error) {
            toast.error(`Error adding user: ${error.message}`);
        }
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();


        const fileInput = event.target.form.querySelector('input[name="profileImage"]');
        const file = fileInput.files[0];

        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', file);

        try {

            const response = await axios.post('http://localhost:5000/api/upload/upload-user-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setUploadedFilePath(response.data.imageUrl);
                toast.success('File uploaded successfully');
            }


        } catch (error) {
            console.error('Failed to upload image:', error);
            toast.error('Image upload failed');
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className="flex bg-custom items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-600 text-center">SignUp</h2>
                <form onSubmit={handleAddUser} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <form
                            method="POST"
                            encType="multipart/form-data"
                            className="flex flex-col items-start gap-4"
                        >
                            <label
                                htmlFor="profileImage"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Profile Image
                            </label>
                            <div className="relative">
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    name="profileImage"
                                    id="profileImage"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        handleImageUpload(e);
                                        handleImageChange(e);
                                    }} />

                                {/* Styled Button */}
                                <label
                                    htmlFor="profileImage"
                                    className="bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />

                                    Upload
                                </label>
                            </div>
                        </form>
                    </div>
                    {selectedImage && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Image Preview:</p>
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-64 object-cover rounded-md border"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
                    >
                        SignUp
                    </button>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Go back to?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Login
                        </a>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Signup;
