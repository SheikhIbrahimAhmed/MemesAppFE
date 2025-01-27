import ballImage from '../assets/images/ball.png'
import bearImage from '../assets/images/bear.png'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/view-memes"); // Replace "/view-memes" with your desired route
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
                            className="object-contain"
                        />
                    </div>

                </div>

                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 relative mb-20">
                            <img
                                src={ballImage}
                                alt="Geometric emblem"
                                fill
                                className="object-contain"
                            />
                        </div>

                    </div>

                    <div className="relative group w-64 h-64 mx-8 flex flex-col items-center">
                        <img
                            src={bearImage}
                            alt="Bear illustration with honey pot"
                            fill
                            className="object-contain cursor-pointer transition-transform duration-300 transform group-hover:scale-110" priority
                            onClick={handleNavigate}

                        />
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full font-semibold font-sans text-sm bg-[#00000000] text-darkBlue px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Click on the bear to view memes
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 relative mb-20">
                            <img
                                src={ballImage}
                                alt="Geometric emblem"
                                fill
                                className="object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
