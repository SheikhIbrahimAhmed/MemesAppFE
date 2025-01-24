import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from "lodash";
import axios from 'axios';
import "../css/memeGallery.css";

const MemeGallery = ({ customMemes }) => {
    const [memes, setMemes] = useState(customMemes || []);
    const [loading, setLoading] = useState(true);
    const [searchedText, setSearchedText] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    const fetchMemes = debounce
        (async ({ page = 1, limit = 9, tags = '' }) => {
            try {
                const skip = (page - 1) * limit;
                const url = `http://localhost:5000/api/post/get-memes`;
                const response = await axios.get(url, {
                    params: { skip, limit, tags },

                });

                const memesData = response.data.memes;
                console.log("response.data.memes.tag", memesData)
                setMemes(memesData);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching memes:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchedText(value);
        fetchMemes({ page: 1, tags: value });
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
            <div className="w-full max-w-md mt-8">
                <input
                    type="text"
                    placeholder="Enter comma separated tags"
                    value={searchedText}
                    onChange={handleInputChange}
                    className="bg-black10 text-black w-full border border-black30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-black50 placeholder-black60"
                />
            </div>
            <div className="w-full max-w-5xl p-4">
                <div className="mt-4">
                    {memes.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {memes.map((meme, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        className="h-80 w-80 rounded-lg"
                                        src={meme.image}
                                        alt={meme.caption || `Meme ${index + 1}`}
                                    />
                                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                                        {meme.tags && meme.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="bg-lightBeige text-black py-1 px-3 rounded-full text-sm"
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
                            <p className="text-lightBeige">No memes found</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center mb-4 justify-center gap-x-6  bg-lightSky bg-opacity-40 p-4 rounded-lg shadow-md">

                <button
                    className="bg-darkBlue text-softWhite bg-opacity-80 hover:bg-darkBlue hover:text-softWhite   px-4 py-2 rounded-lg  transition-all duration-300 focus:outline-none font-semibold"
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
                    className="bg-darkBlue text-softWhite bg-opacity-80 hover:bg-darkBlue hover:text-softWhite   px-4 py-2 rounded-lg  transition-all duration-300 focus:outline-none font-semibold"
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default MemeGallery;


