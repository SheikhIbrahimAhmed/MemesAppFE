import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import toast from "react-hot-toast";


const PostPage = () => {
    const [caption, setCaption] = useState("");
    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedFilePath) {
            toast.error("Please upload a profile image first.");
            return;
        }
        if (!user || !user?._id) {
            toast.error("User data not found in local storage!");
            return;
        }

        const postData = {
            userId: user?._id,
            userName: user.name,
            caption: caption,
            image: uploadedFilePath

        };
        try {
            const response = await fetch("http://localhost:5000/api/auth/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Post created successfully!");
                setCaption('');
                setUploadedFilePath('')
                setSelectedImage(null)
            } else {
                toast.error(data.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("An error occurred while creating the post.");
        }
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();

        if (!user || !user?._id) {
            console.error("User is not defined or missing _id");
            return;
        }
        const fileInput = event.target.form.querySelector('input[name="profileImage"]');
        const file = fileInput.files[0];

        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', file);

        try {

            const response = await axios.post('http://localhost:5000/api/uploadPostImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setUploadedFilePath(response.data.ImagePath);
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
        <div className="flex items-center justify-center min-h-screen bg-custom">
            <div className="p-6 rounded-lg shadow-md w-1/2 max-w-md bg-softCream">
                <h1 className="text-2xl font-bold mb-4 text-gray-600">Create a Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="caption"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Caption
                        </label>
                        <textarea
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter post caption"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                            rows="5"
                            required
                        ></textarea>
                    </div>


                    <div className="flex">
                        <form
                            method="POST"
                            encType="multipart/form-data"
                            className="flex flex-col items-start gap-4"
                        >
                            <label
                                htmlFor="profileImage"
                                className="block text-sm font-medium  text-gray-600"
                            >
                                Upload Image
                            </label>
                            <div className="relative">

                                <input
                                    type="file"
                                    name="profileImage"
                                    id="profileImage"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        handleImageUpload(e);
                                        handleImageChange(e);
                                    }} />

                                <label
                                    htmlFor="profileImage"
                                    className="bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext text-white font-semibold py-2 px-4 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                        className="w-full bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext font-semibold text-white rounded-lg px-4 py-2 transition duration-200"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostPage;
