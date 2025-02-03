import React from "react";
import { useNavigate } from "react-router-dom";
import ballImage from "../assets/images/ball.png";
import bearImage from "../assets/images/bear.png";
import cloudImage from "../assets/images/cloud.png";

export default function Home() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/post-memes");
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
                <div className="flex flex-col items-center mb-10 sm:mb-16">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 relative mb-2 sm:mb-4">
                        <img
                            src={ballImage || "/placeholder.svg"}
                            alt="Upload Meme"
                            className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-110"
                        />
                        <span className="absolute cursor-pointer top-full left-1/2 transform -translate-x-1/2 mt-2 font-sans font-bold text-xs sm:text-sm text-darkBlue hover:text-lightBlue whitespace-nowrap text-center">
                            Upload Your Meme
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center mb-8 sm:mb-0">
                        <IconWithLabel icon={ballImage} cloudIcon={cloudImage} label="Select Project and Add Tags" />
                    </div>

                    <div className="relative group w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 my-8 sm:my-0 mx-auto flex flex-col items-center">
                        <div className="relative w-full h-full">
                            <img
                                src={bearImage || "/placeholder.svg"}
                                alt="View Memes"
                                className="lg:w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                                onClick={handleNavigate}
                            />
                        </div>
                        <span className="absolute cursor-pointer bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full font-sans font-bold text-xs sm:text-sm md:text-base text-darkBlue group-hover:text-lightBlue whitespace-nowrap text-center">
                            Click on the Bear to Upload Memes
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-8 sm:mb-0">
                        <IconWithLabel icon={ballImage} cloudIcon={cloudImage} label="Post to Gallery" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function IconWithLabel({ icon, cloudIcon, label }) {
    return (
        <div className="flex flex-col items-center mb-8 sm:mb-0">
            <div className="relative w-16 sm:w-20 h-12 sm:h-20  sm:mb-16">
                <img
                    src={icon || "/placeholder.svg"}
                    alt="Icon"
                    className="absolute w-9/12 cursor-pointer transition-transform duration-300 hover:scale-110 z-30 pt-2 sm:pt-4"
                />
                <img
                    src={cloudIcon || "/placeholder.svg"}
                    alt="Cloud"
                    className="absolute cursor-pointer transition-transform duration-300 z-10 top-1/2 left-1/2 transform -translate-x-1/2 scale-[3] sm:scale-[4] md:scale-[5]"
                />
                <span className="absolute cursor-pointer left-1/2 top-full  transform -translate-x-1/2 mt-6 font-sans font-bold text-xs sm:text-sm text-darkBlue hover:text-lightBlue whitespace-nowrap text-center z-30">
                    {label}
                </span>
            </div>
        </div>
    );
}