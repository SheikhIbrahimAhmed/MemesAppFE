import React from 'react';
import MemeGallery from '../components/memeGallery';


const ShowMyMemes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id
    return (
        <MemeGallery
            userId={userId}
        />
    );
}

export default ShowMyMemes;