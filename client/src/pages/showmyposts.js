import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { backendUrl } from '../shared/constants/constant';
import toast from 'react-hot-toast';

const ShowMyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [postImageUrls, setPostImageUrls] = useState([]);
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;



    useEffect(() => {
        const fetchMyPosts = async () => {
            try {

                const response = await axios.get(
                    `http://localhost:5000/api/post/get-single-post?userId=${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const postsData = response.data;
                setPosts(postsData);

                const postImages = postsData.map(post => `${backendUrl}${post.image}`);
                setPostImageUrls(postImages)
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyPosts();
    }, []);


    const handleLike = async (postId) => {
        const likedBy = userId
        try {
            const response = await axios.post(
                `http://localhost:5000/api/post/like-post/${postId}`,
                { likedBy },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setPosts(posts.map(post =>
                    post._id === postId
                        ? { ...post, likes: [...post.likes, { likedBy }] }
                        : post
                ));
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentChange = (postId, value) => {
        setComments({ ...comments, [postId]: value });
    };
    const getTimeAgo = (createdAt) => {
        const now = new Date();
        const commentTime = new Date(createdAt);
        const timeDiff = now - commentTime;

        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return `${seconds}s`;
        } else if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else {
            return `${days}d`;
        }
    };
    const handleCommentSubmit = async (postId) => {
        const comment = comments[postId];
        if (comment.trim() === "") return;
        try {
            const response = await axios.post(
                `http://localhost:5000/api/post/comment-post/${postId}`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setPosts(posts.map(post => post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post));
                setComments({ ...comments, [postId]: "" });
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };
    const handleDeletePost = async (postId) => {

        try {
            await axios.delete(`http://localhost:5000/api/post/delete-post`, {
                params: { postId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(posts.filter(post => post._id !== postId));
            toast.success('Post Deleted Successfully')
        } catch (error) {
            toast.error("Failed to delete post:", error);
        }
    };
    const handleDeleteComment = async (commentId) => {
        try {

            await axios.delete(`http://localhost:5000/api/post/delete-comment`, {
                params: { commentId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.comments.some((comment) => comment._id === commentId)
                        ? {
                            ...post,
                            comments: post.comments.filter((comment) => comment._id !== commentId),
                        }
                        : post
                )
            );

            toast.success('Post Deleted Successfully')

        } catch (error) {
            console.error('Failed to delete comment:', error);
            toast.error('Failed to delete comment. Please try again.');
        }
    };

    const profileImageUrl = `${backendUrl}${user?.profileImage}`;
    return (
        <div className='bg-custom'>
            <div className="container mx-auto p-4 w-1/2 ">
                {loading ? (
                    <p className="text-center text-lg text-gray-500">Loading posts...</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={post._id} className="post bg-softCream shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="mr-3 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        {/* <span className="font-semibold text-lg">{post.userName}</span> */}
                                        <img
                                            src={profileImageUrl}
                                            alt={`${user?.name}'s Profile`}
                                            className="size-12 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xl text-gray-600">{post.user.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {getTimeAgo(post.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="text-red-500 ml-auto hover:text-red-700"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-500 hover:text-red-700 transition duration-300"
                                        />
                                    </button>
                                </div>
                            </div>

                            <p className="mb-4 font-bold">{post.caption}</p>
                            {post.image && (
                                <img
                                    src={postImageUrls[index]}
                                    alt="Post "
                                    className="w-full h-72 object-cover rounded-lg mb-6" // Adjust size and rounded corners
                                />
                            )}
                            <div className="flex flex-col gap-4 items-start justify-between mb-4">
                                <div className="flex items-center text-modernMinimal-primary">
                                    <span className="text-lg font-medium">👍</span>
                                    <span className="ml-2 text-lg">{post.likes.length}</span>
                                </div>
                                <button
                                    onClick={() => handleLike(post._id)}
                                    className="flex items-center font-semibold text-white bg-skyBlue hover:bg-hoverSkyBlue hover:text-hovertext font-semibold px-4 py-2 rounded-full shadow-md  transition duration-700"
                                >
                                    <span className="mr-2  text-lg">👍</span> Like
                                </button>
                            </div>

                            <div className="comments mt-4">
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        value={comments[post._id] || ""}
                                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                        className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Add a comment..."
                                    />
                                    <button
                                        onClick={() => handleCommentSubmit(post._id)}
                                        className="bg-skyBlue text-white font-semibold hover:bg-hoverSkyBlue hover:text-hovertext  p-3 rounded-r-lg  transition duration-300"
                                    >
                                        Comment
                                    </button>
                                </div>

                                <div className="comment-list">
                                    {post.comments.map((comment, index) => (
                                        <div
                                            key={comment._id}
                                            className="comment py-4 px-4 border-b border-gray-200 flex items-start gap-4"
                                        >

                                            <div className="flex-shrink-0">
                                                <img
                                                    src={profileImageUrl}
                                                    alt={`${user?.name}'s Profile`}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </div>


                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-600">{comment.commentedByUserName}</p>
                                                    <p className=" text-sm">{getTimeAgo(comment.createdAt)}</p>
                                                </div>
                                                <p className="text-earthBrown mt-1">{comment.comment}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteComment(comment._id)}
                                                className=" transition duration-300"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="icon-Gray transition duration-300 "
                                                />
                                            </button>

                                        </div>


                                    ))}
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ShowMyPosts;