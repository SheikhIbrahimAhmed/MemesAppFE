import ballImage from '../assets/images/ball.png'
import bearImage from '../assets/images/bear.png'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/post-memes");
    };
    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="relative max-w-6xl mx-auto pt-20 pb-32 px-4">
                <div className="flex flex-col items-center mb-16">
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 relative mb-2">
                        <img
                            src={ballImage}
                            alt="Geometric emblem"
                            fill
                            className="object-contain cursor-pointer transition-transform duration-300 transform hover:scale-110"
                        />
                        <span className="absolute cursor-pointer top-8 left-1/2 transform -translate-x-1/2 translate-y-full font-sans font-bold text-xs md:text-sm bg-[#00000000] text-[#1E3A8A] hover:text-[#2563EB] px-2 py-1 rounded  transition-opacity duration-300 whitespace-nowrap">
                            Upload Your Meme
                        </span>
                    </div>

                </div>

                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className=" w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 relative mb-20">
                            <img
                                src={ballImage}
                                alt="Geometric emblem"
                                fill
                                className="object-contain cursor-pointer transition-transform duration-300 transform hover:scale-110"
                            />
                            <span className="absolute cursor-pointer left-1/2 top-10 transform -translate-x-1/2 translate-y-full font-sans font-bold text-xs md:text-sm bg-[#00000000] text-[#1E3A8A] hover:text-[#2563EB] px-2 py-1 rounded opacity-100 whitespace-nowrap">
                                Select Project and Add Tags
                            </span>
                        </div>

                    </div>

                    <div className="relative group w-64 h-64 mx-8 flex flex-col items-center">
                        <FontAwesomeIcon icon={faFolder} className="text-lightBlue w-32 h-32 md:w-48 md:h-52" onClick={handleNavigate} />
                        <span className="absolute cursor-pointer bottom-16 md:bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full font-sans font-bold text-xs md:text-sm bg-[#00000000] text-[#1E3A8A] hover:text-[#2563EB] px-2 py-1 rounded  transition-opacity duration-300 whitespace-nowrap">
                            Click on the Folder to Upload Memes
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 relative mb-20">
                            <img
                                src={ballImage}
                                alt="Geometric emblem"
                                fill
                                className="object-contain cursor-pointer transition-transform duration-300 transform hover:scale-110"
                            />
                            <span className="absolute cursor-pointer top-10 left-1/2 transform -translate-x-1/2 translate-y-full font-sans font-bold text-xs md:text-sm bg-[#00000000] text-[#1E3A8A] hover:text-[#2563EB] px-2 py-1 rounded  transition-opacity duration-300 whitespace-nowrap">
                                Post to Gallery
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
