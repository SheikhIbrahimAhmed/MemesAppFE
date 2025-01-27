import React from 'react';
import MemeGallery from '../components/memeGallery';

const ShowMemes = () => {
    return (
        <div className="bg-transparent min-h-screen flex flex-col items-center justify-start">
            <div className="mt-6 w-full">
                <MemeGallery />
            </div>
        </div>

    );
};

export default ShowMemes;
