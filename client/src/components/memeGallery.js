import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/memeGallery.css"
import toast from 'react-hot-toast';
const MemeGallery = ({ customMemes, userId }) => {
    const [memes, setMemes] = useState(customMemes || []);
    const [loading, setLoading] = useState(true);
    const [selectedTags, setSelectedTags] = useState([]);

    const token = localStorage.getItem("token");
    const tags = [
        "All categories",
        "Work memes",
        "Funny memes",
        "Relatable Memes",
        "Trending Memes",
        "Meme Compilation",
        "Funny Pictures",
        "Laugh Out Loud",
        "Viral Memes",
        "Meme Faces",
        "Meme Culture",
        "Reaction Memes",
        "Satirical Memes",
        "Internet Memes",
        "Random Memes",
        "Humor Memes",
        "Meme Format",
        "Meme Templates",
        "Dark Humor Memes",
        "Wholesome Memes",
        "Work Memes",
        "Pet Memes",
        "School Memes",
        "Tech Memes",
        "Political Memes"
    ];

    useEffect(() => {
        if (!customMemes) {
            const fetchMemes = async () => {
                try {
                    const url = userId
                        ? `http://localhost:5000/api/post/get-memes?userId=${userId}`
                        : `http://localhost:5000/api/post/get-memes`;

                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setMemes(response.data);
                } catch (error) {
                    console.error("Error fetching memes:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMemes();
        }
    }, [customMemes, token, userId]);

    const handleTagClick = (tag) => {
        setSelectedTags((prevTags) => {
            const updatedTags = prevTags.includes(tag)
                ? prevTags.filter((item) => item !== tag)
                : [...prevTags, tag];
            handleMemeSearch(updatedTags);
            return updatedTags;
        });
    };
    const handleMemeSearch = async (tags) => {

        try {
            const response = await axios.get(
                `http://localhost:5000/api/post/get-memes`,
                {
                    params: { tags },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const memesData = response.data;
            setMemes(memesData);

        } catch (error) {
            console.error("Error searching for the post by caption:", error);
            throw error;
        }
    };

    return (
        <div className=" flex items-center justify-center min-h-screen">
            <div className="w-full max-w-5xl p-4">
                <div className="flex items-center justify-start py-4 md:py-8 overflow-x-auto space-x-3 custom-scrollbar">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`tag-button text-black10 border font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${selectedTags.includes(tag)
                                ? 'bg-black70 text-black30 border-black'
                                : 'bg-black80 border-black60 hover:bg-black30 hover:text-black focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                                }`}
                            onClick={() => {
                                handleTagClick(tag);
                                handleMemeSearch();
                            }}
                        >
                            {tag}
                        </button>
                    ))}

                </div>



                <div className="mt-4">
                    {memes.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {memes.map((meme, index) => (
                                <div key={index}>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src={meme.image}
                                        alt={meme.caption || `Meme ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-96">
                            <p className="text-black30">No memes found</p>
                        </div>
                    )}
                </div>

            </div>
        </div >
    );
};

export default MemeGallery;
