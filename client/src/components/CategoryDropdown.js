import { useState, useRef, useEffect } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import axios from 'axios';

export default function CategoryDropdown({ onSelect, bgColor = "skyBlue", textColor = "darkBlue" }) {

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => {
        dropdownRef.current.classList.add('hidden');
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/api/post/get-categories`;
                const response = await axios.get(url);
                console.log("response.data", response.data)
                setCategories(response.data); // Response should be [{ _id, name }]
                console.log("Categories", categories)
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchCategories();
    }, []);
    const handleSelect = (category) => {
        setSelectedCategory(category.name);  // Store category name for display
        onSelect(category._id); // Pass only the category ID to parent
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                id="dropdown-button"
                className={`w-full bg-${bgColor} border border-gray-300 text-${textColor} text-sm px-2 py-2 sm:px-3 rounded-[10px] shadow-sm flex justify-between items-center focus:outline-none whitespace-nowrap font-medium`}
                onClick={(e) => {
                    const dropdown = e.currentTarget.nextElementSibling;
                    dropdown.classList.toggle('hidden');
                }}
            >
                {selectedCategory || 'Select Category'}
                <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <ul
                ref={dropdownRef}
                className="absolute w-full mt-2 bg-[#fff] rounded-[10px] max-h-[120px] shadow-lg overflow-y-auto z-20 hidden"
            >
                {categories.map((category) => (
                    <li
                        key={category._id}
                        onClick={() => {
                            handleSelect(category);
                            dropdownRef.current.classList.add('hidden');
                        }}
                        className="px-4 py-2 hover:bg-softWhite cursor-pointer"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
