import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import toast from "react-hot-toast";
import DropDown from "../components/tagsDropDown/dropDown";


const MemePostPage = () => {

    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")



    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedFilePath) {
            // toast.error("Please upload a meme image first.");
            // return;
        }
        if (!user || !user?._id) {
            toast.error("User data not found in local storage!");
            return;
        }

        const postData = {
            userId: user?._id,
            tags: selectedTags,
            image: uploadedFilePath

        };
        try {
            const response = await fetch("http://localhost:5000/api/post/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Meme Posted Successfully!");
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

    const handleImageUpload = async (e) => {

        if (uploadedFilePath) {
            toast.error("You can post only one meme at a time")
            return;
        }
        const fileInput = e.target.form.querySelector('input[name="memeImage"]');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('memeImage', file);


        try {
            const response = await axios.post("http://localhost:5000/api/upload/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log("response.data......", response.data)
                setUploadedFilePath(response.data.imageUrl);
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload images.");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("An error occurred while uploading images.");
        }
    };
    const handleImageChange = (event) => {
        if (uploadedFilePath) {
            return;
        }
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-black90">
            <div className="p-6 rounded-lg shadow-md w-1/2 max-w-md bg-black80">
                <h1 className="text-2xl font-bold mb-4 text-black30">Post a Meme</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                        <form
                            method="POST"
                            encType="multipart/form-data"
                            className="flex flex-col items-start gap-4"
                        >
                            <label
                                htmlFor="memeImage"
                                className="block text-sm font-medium text-black30"
                            >
                                Upload Image
                            </label>
                            <div className="relative">

                                <input
                                    type="file"
                                    name="memeImage"
                                    id="memeImage"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        handleImageUpload(e);
                                        handleImageChange(e);
                                    }} />

                                <label
                                    htmlFor="memeImage"
                                    className="bg-black70 text-white  hover:bg-black30 hover:text-black font-semibold py-2 px-4 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    Upload
                                </label>
                            </div>
                        </form>
                    </div>
                    {selectedImage && (
                        <div>
                            <button
                                onClick={() => {
                                    URL.revokeObjectURL(selectedImage);
                                    setSelectedImage(null);
                                    setUploadedFilePath('')
                                }}
                                className="bg-red-800  px-3 py-1 rounded-lg"
                            >
                                <FontAwesomeIcon icon={faCircleXmark} className="text-black10 hover:text-black30" />
                            </button>
                            <img src={selectedImage} alt="Uploaded" className="max-w-full h-auto" />
                            <button
                                onClick={() => {
                                    URL.revokeObjectURL(selectedImage);
                                    setSelectedImage(null);
                                    setUploadedFilePath('')
                                }}
                                className=""
                            >
                            </button>
                        </div>
                    )}
                    <DropDown handleTagSelection={handleTagSelection} selectedTags={selectedTags} />


                    <button
                        type="submit"
                        className="w-full bg-black90 bg-opacity-50 text-black30  hover:bg-black70 hover:text-black90 font-bold  rounded-lg px-4 py-2 transition duration-200"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MemePostPage;
