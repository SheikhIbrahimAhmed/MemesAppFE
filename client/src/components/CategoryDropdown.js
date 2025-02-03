import { useState } from 'react';

export default function CategoryDropdown({ categories, onSelect, bgColor = "skyBlue", textColor = "darkBlue" }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelect = (category) => {
        setSelectedCategory(category);
        if (onSelect) onSelect(category);
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                id="dropdown-button"
                className={`w-full bg-${bgColor} border border-gray-300 text-${textColor} py-2 px-4 rounded-[10px] shadow-sm flex justify-between items-center focus:outline-none whitespace-nowrap`}
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
                className="absolute w-full mt-2 bg-[#fff]  rounded-[10px] max-h-[120px] shadow-lg overflow-y-auto z-20 hidden"
            >
                {categories.map((category) => (
                    <li
                        key={category}
                        onClick={() => {
                            handleSelect(category);
                            document.getElementById('dropdown-button').nextElementSibling.classList.add('hidden');
                        }}
                        className="px-4 py-2 hover:bg-softWhite cursor-pointer"
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
