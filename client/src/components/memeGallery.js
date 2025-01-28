import React, { useEffect, useState } from 'react';
import { debounce } from "lodash";
import axios from 'axios';
import "../css/memeGallery.css";
import CategoryDropdown from './CategoryDropdown';

const MemeGallery = ({ customMemes }) => {
    const [memes, setMemes] = useState(customMemes || []);
    const [loading, setLoading] = useState(true);
    const [searchedText, setSearchedText] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['', 'Funny', 'Work', 'Motivational', 'Relatable', 'Sarcastic', 'Wholesome'];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        fetchMemes({ page: 1, tags: searchedText, category });
    };

    const fetchMemes = debounce(async ({ page = 1, limit = 9, tags = '', category = '' }) => {
        setLoading(true); // Set loading to true before starting the fetch
        try {
            const skip = (page - 1) * limit;
            const url = `${process.env.REACT_APP_API_URL}/api/post/get-memes`;
            const response = await axios.get(url, {
                params: { skip, limit, tags, category },
            });

            const memesData = response.data.memes;
            setMemes(memesData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching memes:", error);
        } finally {
            setLoading(false); // Set loading to false once fetch is complete
        }
    }, 1000);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchedText(value);
        fetchMemes({ page: 1, tags: value, category: selectedCategory });
    };

    useEffect(() => {
        if (!customMemes) {
            fetchMemes({ page });
        }
    }, [customMemes, page]);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            fetchMemes({ page: page + 1, tags: searchedText });
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchMemes({ page: page - 1, tags: searchedText });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-fit">
            {/* Search and Category Filter */}
            <div className="w-full max-w-lg mt-8 flex gap-4">
                <input
                    type="text"
                    placeholder="Enter comma separated tags"
                    value={searchedText}
                    onChange={handleInputChange}
                    className="bg-black10 text-[#000] w-1/3 md:w-1/2 lg:w-2/3 border border-black30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-black50 placeholder-black60 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base"
                />
                <div className='w-1/3'>
                    <CategoryDropdown categories={categories} onSelect={handleCategorySelect} bgColor='gray-100' textColor='gray-700' />
                </div>
            </div>

            {/* Memes or Loading */}
            <div className="w-full max-w-5xl p-4">
                <div className="mt-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <p className="text-darkBlue font-sans font-bold">Loading...</p>
                        </div>
                    ) : memes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            {memes.map((meme, index) => (
                                <div key={index} className="flex flex-col items-center border border-darkBlue rounded-md p-3">
                                    <img
                                        className="h-80 w-80 rounded-lg"
                                        src={meme.image}
                                        alt={meme.caption || `Meme ${index + 1}`}
                                    />
                                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                                        {meme.tags && meme.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 rounded-full text-darkBlue bg-[#FFFFF7] bg-opacity-20 font-semibold text-sm border border-lightBlue transition-transform transform hover:scale-105 hover:bg-opacity-40 hover:border-[#fff]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-96">
                            <p className="text-darkBlue font-sans font-bold">No memes found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center mb-4 justify-center gap-x-6 bg-lightSky bg-opacity-30 p-4 rounded-lg shadow-md">
                <button
                    className="bg-darkBlue text-softWhite bg-opacity-80 hover:bg-darkBlue hover:text-softWhite px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none font-semibold"
                    onClick={prevPage}
                >
                    Previous
                </button>
                <span className="text-darkBlue font-medium text-sm">
                    Page{" "}
                    <span className="text-darkBlue font-bold">{page}</span> of{" "}
                    <span className="text-darkBlue font-bold">{totalPages}</span>
                </span>
                <button
                    className="bg-darkBlue text-softWhite bg-opacity-80 hover:bg-darkBlue hover:text-softWhite px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none font-semibold"
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MemeGallery;
