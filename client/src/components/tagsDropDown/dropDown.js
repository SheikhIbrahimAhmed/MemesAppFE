import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const DropDown = ({ selectedTags, handleTagSelection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    console.log("selectedTags in DropDown:", selectedTags);
    if (!Array.isArray(selectedTags)) {
        console.error("selectedTags is not an array!", selectedTags);
    }

    const tags = ["Funny memes", "Work memes", "Trending Memes", "Viral Memes"];

    return (
        <div className="relative inline-block">

            <div className="w-full mb-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300">

                <div className="w-full flex flex-wrap gap-2">
                    {selectedTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-black50  text-white px-3 py-1 rounded-full text-sm flex items-center"
                        >
                            {tag}
                            <button
                                className="ml-2 text-white hover:text-red-500 focus:outline-none"
                                onClick={() => handleTagSelection(tag)}
                                title={`Remove ${tag}`}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} className="hover:text-skyBlue" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={toggleDropdown}
                className="bg-black70  text-white  hover:bg-black30 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Select Tags
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {tags.map((tag) => (
                            <li key={tag}>
                                <label className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleTagSelection(tag)}
                                    />
                                    {tag}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDown;
