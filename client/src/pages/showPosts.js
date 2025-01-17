import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTimeAgo } from '../shared/utils/commonfunctions';
import { backendUrl, getUser, getUserId } from '../shared/constants/constant';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [reactions, setReactions] = useState({});
    const [searchedText, setSearchedText] = useState('');
    const token = localStorage.getItem("token");
    const user = getUser();
    const userId = getUserId();
    const navigate = useNavigate()



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/post/get-posts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const postsData = response.data;
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts, comments, or likes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        console.log("handleLike Triggered")
        try {
            const likedBy = userId;
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
            else if (response.status === 204) {
                toast.error("Already liked");
                const currentPost = posts.find((post) => post?._id === postId);
                currentPost.likes.pop();
                setPosts([...posts]);
            }

        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentChange = (postId, value) => {
        setComments({ ...comments, [postId]: value });
    };

    const handleCommentSubmit = async (postId) => {
        const comment = comments[postId];
        if (comment.trim() === "") return;

        try {
            const commentedBy = userId

            const response = await axios.post(
                `http://localhost:5000/api/post/comment-post/${postId}`,
                { comment, commentedBy },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (response.status === 200) {
                setPosts(posts.map(post =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, { comment, commentedByUserName: user.name, commentedByProfileImage: user.profileImage, createdAt: Date.now() }] }
                        : post
                ));

                setComments({ ...comments, [postId]: "" });
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };

    const handleReactionComment = async (commentId, reaction) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/post/comments/react`,
                { userId, reaction },
                {
                    params: { commentId: commentId }
                }
            );
            setReactions((prevReactions) => ({
                ...prevReactions,
                [commentId]: reaction,
            }));
            console.log("Reaction updated:", response.data);
        } catch (error) {
            console.error("Error updating reaction:", error);
        }
    };


    const handlePostSearch = async (caption) => {
        console.log("caption", caption)
        try {
            const response = await axios.get(
                `http://localhost:5000/api/post/search-post`,
                {
                    params: { caption },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const postsData = response.data;
            console.log("Searched Post Data", postsData)
            setPosts(postsData);
            if (response.data.length === 0) {
                toast.error("No Posts Found");
            }
        } catch (error) {
            console.error("Error searching for the post by caption:", error);
            throw error;
        }
    };
    const handleMessage = (sentTo, sentToProfileImage) => {

        navigate("/user-chat", { state: { sentTo, sentToProfileImage } });
    }
    return (
        <div className='bg-custom'>
            <div className="container mx-auto p-4 w-1/2 ">
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search posts by caption"
                        value={searchedText}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchedText(value);
                            handlePostSearch(value);
                        }}
                        className="flex-1 p-3 h-10 rounded-l-lg text-earthBrown border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {loading ? (
                    <p className="text-center text-lg text-modernMinimal-primary">Loading posts...</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={post._id} className="post bg-softCream shadow-lg rounded-lg p-6 mb-6 mt-6 transition-transform transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">

                                <div className="flex items-center">
                                    <img
                                        src={`${backendUrl}${post?.user?.profileImage}`}
                                        alt={`${post.user.name}'s Profile`}
                                        className="w-12 h-12 rounded-full bg-gray-200 mr-3"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-600 text-base">{post.user.name}</h3>
                                        <p className="text-sm text-modernMinimal-primary">{getTimeAgo(post.createdAt)}</p>
                                    </div>
                                </div>



                                <button
                                    onClick={() => handleMessage(post.user._id, post.user.profileImage)}
                                    className="bg-skyBlue text-white font-semibold hover:bg-hoverSkyBlue hover:text-hovertext px-4 py-2 rounded-lg flex items-center transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faFacebookMessenger} className="mr-2" />
                                    Send Message
                                </button>
                            </div>

                            <p className="mb-4 font-bold">{post.caption}</p>
                            {post.image && (
                                <img
                                    src={`${backendUrl}${post?.image}`} alt="Post "
                                    className="w-full h-72 object-cover rounded-lg mb-6"
                                />
                            )}

                            <div className="flex flex-col items-start gap-4 mb-4">
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
                                <div className="reaction-popup absolute top-[-40px] left-0 flex items-center gap-3 bg-white border border-gray-300 rounded-full shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                        onClick={() => handleReactionComment('like')}
                                    >
                                        👍 Like
                                    </button>
                                    <button
                                        className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                        onClick={() => handleReactionComment('love')}
                                    >
                                        ❤️ Love
                                    </button>
                                    <button
                                        className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                        onClick={() => handleReactionComment('haha')}
                                    >
                                        😂 Haha
                                    </button>
                                    <button
                                        className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                        onClick={() => handleReactionComment('wow')}
                                    >
                                        😮 Wow
                                    </button>
                                    <button
                                        className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                        onClick={() => handleReactionComment('sad')}
                                    >
                                        😢 Sad
                                    </button>
                                </div>
                            </div>


                            <div className="comments mt-4">
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        value={comments[post._id] || ""}
                                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                        className="flex-1 p-3 text-earthBrown rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    {post.comments.map((comment) => (
                                        <div
                                            key={comment._id}
                                            className="comment py-4 px-4 border-b border-gray-200 flex items-start gap-4"
                                        >
                                            <div className="flex-shrink-0">
                                                {comment.commentedByProfileImage && (
                                                    <img
                                                        src={`${backendUrl}${comment.commentedByProfileImage}`}
                                                        alt={`${comment.commentedByUserName}'s Profile`}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-gray-600">{comment.commentedByUserName}</p>
                                                    <p className="text-sm">{getTimeAgo(comment.createdAt)}</p>
                                                </div>
                                                <p className="text-earthBrown mt-1">{comment.comment}</p>

                                                <div className="mt-2 relative group rounded">
                                                    <button className="text-modernMinimal-primary hover:underline flex items-center gap-1">

                                                        <span className="text-xl">
                                                            {reactions[comment._id] === 'love' ? '❤️' :
                                                                reactions[comment._id] === 'haha' ? '😂' :
                                                                    reactions[comment._id] === 'wow' ? '😮' :
                                                                        reactions[comment._id] === 'sad' ? '😢' : '👍'}
                                                        </span>
                                                        <span className="text-sm">
                                                            {reactions[comment._id] === 'love' ? 'Love' :
                                                                reactions[comment._id] === 'haha' ? 'Haha' :
                                                                    reactions[comment._id] === 'wow' ? 'Wow' :
                                                                        reactions[comment._id] === 'sad' ? 'Sad' : 'Like'}
                                                        </span>
                                                    </button>

                                                    <div className="reaction-popup absolute top-[-40px] left-0 flex items-center gap-3 bg-white border border-gray-300 rounded-full shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                                            onClick={() => handleReactionComment(comment._id, 'like')}
                                                        >
                                                            👍 Like
                                                        </button>
                                                        <button
                                                            className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                                            onClick={() => handleReactionComment(comment._id, 'love')}
                                                        >
                                                            ❤️ Love
                                                        </button>
                                                        <button
                                                            className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                                            onClick={() => handleReactionComment(comment._id, 'haha')}
                                                        >
                                                            😂 Haha
                                                        </button>
                                                        <button
                                                            className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                                            onClick={() => handleReactionComment(comment._id, 'wow')}
                                                        >
                                                            😮 Wow
                                                        </button>
                                                        <button
                                                            className="reaction-item flex items-center gap-1 text-modernMinimal-primary hover:scale-125 transition-transform duration-200"
                                                            onClick={() => handleReactionComment(comment._id, 'sad')}
                                                        >
                                                            😢 Sad
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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

};

export default ShowPosts;
