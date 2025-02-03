import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../css/memeGallery.css";
import CategoryDropdown from "./CategoryDropdown";
import MemeSkeleton from "./Skeleton";

const MemeGallery = ({ customMemes }) => {
    const [memes, setMemes] = useState(customMemes || []);
    const [loading, setLoading] = useState(true);
    const [searchedText, setSearchedText] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const isFetchingRef = useRef(false);
    const firstScrollTriggered = useRef(false);
    const firstLoadRef = useRef(true)
    const [noMemesFound, setNoMemesFound] = useState(false);
    console.log("memes", memes)
    const categories = ["", "Funny", "Work", "Motivational", "Relatable", "Sarcastic", "Wholesome"];
    console.log("page", page)
    console.log("totalpage", totalPages)


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setPage(1);
        setMemes([]);
        setIsFetching(true);
        fetchMemes({ page: 1, tags: searchedText, category });
    };

    const fetchMemes = debounce(async ({ page = 1, limit = 9, tags = "", category = "" }) => {
        if (isFetching) return;
        setIsFetching(true);
        setLoading(true);
        setNoMemesFound(false);

        const previousScrollHeight = document.documentElement.scrollHeight;
        const previousScrollTop = window.scrollY;
        try {
            const skip = (page - 1) * limit;
            const url = `${process.env.REACT_APP_API_URL}/api/post/get-memes`;
            const response = await axios.get(url, {
                params: { skip, limit, tags, category },
            });

            const memesData = response.data.memes;
            console.log("memesdatalenght", memesData.length)
            if (memesData.length === 0) {
                setNoMemesFound(true);
            } else {
                setMemes((prevMemes) => [...prevMemes, ...memesData]);
                setTotalPages(response.data.totalPages);
                setPage(page);
            }
            requestAnimationFrame(() => {
                const newScrollHeight = document.documentElement.scrollHeight
                const heightDifference = newScrollHeight - previousScrollHeight

                if (!firstLoadRef.current && heightDifference > 0) {
                    window.scrollTo({
                        top: previousScrollTop,
                        behavior: "instant",
                    })
                }

                firstLoadRef.current = false
            })

        } catch (error) {
            console.error("Error fetching memes:", error);
        } finally {
            setLoading(false);
            setIsFetching(false);
            const newScrollHeight = document.documentElement.scrollHeight;




            if (firstScrollTriggered.current) {
                const heightDifference = newScrollHeight - previousScrollHeight;

                window.scrollTo({
                    top: previousScrollTop + heightDifference,
                    behavior: "instant",
                });

            } else {
                firstScrollTriggered.current = true;
            }

        }
    }, 1000);


    const handleInputChangeDelay = useCallback(
        debounce((value) => {
            setMemes([]);
            setIsFetching(true);
            fetchMemes({ page: 1, tags: value, category: selectedCategory });
        }, 1000),
        []
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchedText(value);
        setPage(1);
        setMemes([]);
        handleInputChangeDelay(value);
    };

    useEffect(() => {
        if (!customMemes) {
            fetchMemes({ page: 1 });
        }
    }, [customMemes]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + document.documentElement.scrollTop
            const scrollThreshold = document.documentElement.offsetHeight - 50

            if (scrollPosition >= scrollThreshold) {
                if (page < totalPages && !isFetchingRef.current) {
                    isFetchingRef.current = true
                    fetchMemes({
                        page: page + 1,
                        tags: searchedText,
                        category: selectedCategory,
                    })

                    setTimeout(() => {
                        isFetchingRef.current = false
                    }, 1200)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page, totalPages, searchedText, selectedCategory, fetchMemes])

    const handleDownload = async (imageUrl, tags = [], defaultFilename = "meme.jpg") => {
        try {
            const sanitizedTags = tags.length > 0 ? tags.join("-").replace(/\s+/g, "-") : "meme";
            const filename = `${sanitizedTags}-meme.jpg`;

            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-fit">
            <div className="w-full max-w-lg mt-8 flex gap-4">
                <input
                    type="text"
                    placeholder="Enter comma separated tags"
                    value={searchedText}
                    onChange={handleInputChange}
                    className="bg-black10 text-[#000] w-1/3 md:w-1/2 lg:w-2/3 border border-black30 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-black50 placeholder-black60 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base"
                />
                <div className="w-1/3">
                    <CategoryDropdown categories={categories} onSelect={handleCategorySelect} bgColor="gray-100" textColor="gray-700" />
                </div>

            </div>

            <div className="w-full max-w-5xl p-4">
                <div className="mt-4">
                    {loading && page === 1 ? (
                        <div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full">
                            {memes.map((meme, index) => (
                                <div key={index} className="relative flex flex-col items-center border border-darkBlue rounded-[10px] p-3 group bg-lightSky">
                                    <button
                                        className="absolute  bottom-[12%] right-[5%] sm:bottom-24 sm:border  md:bottom-[90px] md:right-40 lg:bottom-12 lg:right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[skyBlue] bg-opacity-100 group-hover:bg-opacity-20 p-2 rounded-[10px] z-10"
                                        onClick={() => handleDownload(meme.image, meme.tags)}
                                    >
                                        <FontAwesomeIcon icon={faCircleDown} className="w-5 h-5 text-darkBlue rounded-[10px]" />
                                    </button>
                                    <img loading="lazy" className="h-80 w-80 rounded-[10px] transition-transform transform group-hover:scale-105" src={meme.image} alt={meme.caption || `Meme ${index + 1}`} />
                                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                                        {meme.tags &&
                                            meme.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 rounded-[10px] text-darkBlue bg-[#FFFFF7] bg-opacity-30 font-semibold text-sm border border-lightBlue transition-transform transform hover:scale-105 hover:bg-opacity-40 hover:border-[#fff]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {page === totalPages ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-darkBlue font-sans font-bold">No memes found</p>
                    </div>) : (
                    <MemeSkeleton />
                )}

            </div>
            {isFetching && (
                <div className="flex justify-center items-center my-4">
                </div>
            )}
        </div>
    );
};

export default MemeGallery;
