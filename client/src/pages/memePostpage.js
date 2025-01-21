import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import toast from "react-hot-toast";


const MemePostPage = () => {

    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);




    const validateTags = (selectedTags) => {

        const tagsArray = selectedTags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);
        const uniqueTags = [...new Set(tagsArray)];
        if (uniqueTags.length !== tagsArray.length) {
            return { isValid: false, error: "Tags must not contain duplicates." };
        }
        if (uniqueTags.length > 6) {
            return { isValid: false, error: "You can add up to 6 unique tags only." };
        }

        return { isValid: true, tags: uniqueTags };
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, tags, error } = validateTags(selectedTags);
        if (!isValid) {
            toast.error(error);
            return;
        }
        if (!uploadedFilePath) {
            toast.error("Please upload a meme image first.");
            return;
        }


        const postData = {
            tags: selectedTags,
            image: uploadedFilePath

        };
        try {
            const response = await fetch("https://memes-app-be.vercel.app/api/post/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Meme Posted Successfully!");
                setUploadedFilePath('')
                setSelectedImage(null)
                setSelectedTags('')
            } else {
                toast.error(data.error || "Failed to post meme");
            }
        } catch (error) {
            console.error("Error posting meme:", error);
            toast.error("An error occurred while posting the meme.");
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
            const response = await axios.post("https://memes-app-be.vercel.app/api/upload/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log("response.data......", response.data)
                setUploadedFilePath(response.data.imageUrl);
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
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-lightBrown">
                <h1 className="text-2xl font-bold mb-4 text-softWhite">Post a Meme</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="memeImage"
                            className="w-full text-sm font-medium text-softWhite"
                        >
                            Upload Image
                        </label>
                        <div className="w-full text-center bg-warmYellow text-darkBlue hover:bg-darkBlue hover:text-softWhite font-semibold rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-lightBeige focus:ring-offset-2">
                            <input
                                type="file"
                                name="memeImage"
                                id="memeImage"
                                className="hidden inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    handleImageUpload(e);
                                    handleImageChange(e);
                                }}
                            />
                            <label
                                htmlFor="memeImage"
                                className="w-full flex justify-center items-center text-center py-2 px-4 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                <p>Upload</p>
                            </label>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="flex flex-col items-start">
                            <button
                                onClick={() => {
                                    URL.revokeObjectURL(selectedImage);
                                    setSelectedImage(null);
                                    setUploadedFilePath('');
                                }}
                                className="bg-red-700 text-softWhite hover:bg-red-600 py-1 rounded-lg"
                            >
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="text-softWhite hover:text-lightBeige"
                                />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Uploaded"
                                className="max-w-40 h-40 border border-lightBeige rounded-lg"
                            />
                        </div>
                    )}
                    <input
                        id="tags"
                        value={selectedTags}
                        onChange={(e) => setSelectedTags(e.target.value)}
                        placeholder="Add commas separated tags to your meme"
                        className="bg-lightBeige text-darkBlue w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-warmYellow placeholder-darkGray"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-warmYellow text-darkBlue hover:bg-darkBlue hover:text-softWhite font-bold rounded-lg px-4 py-2 transition duration-200"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );


};

export default MemePostPage;
