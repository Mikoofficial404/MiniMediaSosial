import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import {getPosts} from "../../../services/post.js";
import {createComments, deleteComment} from "../../../services/comments.js";

const BASE_URL = "http://127.0.0.1:8000";

export default function InstagramPost() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [commentInputs, setCommentInputs] = useState({});
    const [submittingComments, setSubmittingComments] = useState({});

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const postsData = await getPosts();
            setPosts(postsData);
        } catch (error) {
            console.log(error);
            setError("Gagal Ambil data posts");
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCommentChange = (postId, value) => {
        setCommentInputs(prev => ({
            ...prev,
            [postId]: value
        }));
    };

    const handleSubmitComment = async (postId) => {
        const commentContent = commentInputs[postId]?.trim();
        if (!commentContent) return;

        try {
            setSubmittingComments(prev => ({
                ...prev,
                [postId]: true
            }));

            const payload = {
                posts_id: postId,
                content: commentContent,
            };

            await createComments(payload);
            

            setCommentInputs(prev => ({
                ...prev,
                [postId]: ""
            }));

            await fetchPosts();

        } catch (error) {
            console.log(error);
            alert("Gagal menambahkan komentar. Pastikan Anda sudah login.");
        } finally {
            setSubmittingComments(prev => ({
                ...prev,
                [postId]: false
            }));
        }
    };

    const handleKeyPress = (e, postId) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment(postId);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
            if (confirmDelete) {
                await deleteComment(id);
                await fetchPosts(); 
            }
        }catch (e) {
            console.log(e);
            throw e;
        }
    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500">Memuat...</span>
            </div>
        );
    }

    if (error) {
        return (
            <section className="p-4">
                <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-md p-3 text-sm flex items-center justify-between">
                    <div>
                        <strong className="font-medium">Terjadi Kesalahan:</strong> {error}
                    </div>
                    <button
                        onClick={fetchPosts}
                        className="ml-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        Coba Lagi
                    </button>
                </div>
            </section>
        );
    }

    return (
        <div className="max-w-sm mx-auto space-y-4">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={post.id || index} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {post.user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <p className="text-sm font-semibold">{post.user?.fullname || 'User'}</p>
                            </div>
                            <EllipsisHorizontalIcon className="w-5 h-5 text-gray-800" />
                        </div>
                        {post.image_path && (
                            <img
                                src={`${BASE_URL}/${post.image_path}`}
                                alt="Post image"
                                className="w-full aspect-square object-cover"
                            />
                        )}

                        {/* Action Buttons */}
                        <div className="px-4 pt-3 pb-2">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <button className="text-gray-800 hover:text-gray-600">
                                        <HeartIcon className="w-6 h-6" />
                                    </button>
                                    <button className="text-gray-800 hover:text-gray-600">
                                        <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                                    </button>
                                    <button className="text-gray-800 hover:text-gray-600">
                                        <PaperAirplaneIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <button className="text-gray-800 hover:text-gray-600">
                                    <BookmarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="px-4">
                            <p className="text-sm font-semibold">{post.likes?.length || 0} likes</p>
                            {post.comments && post.comments.length > 0 && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                        <div className="px-4 pt-1 pb-2">
                            <p className="text-sm">
                                <span className="font-semibold">{post.user?.fullname || 'User'}</span>
                                {' '}{post.content || 'No content'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Unknown date'}
                            </p>
                        </div>
                        {/* Comments Section */}
                        {post.comments && post.comments.length > 0 && (
                            <div className="px-4 py-2 border-t border-gray-100">
                                {post.comments.length > 2 && (
                                    <p className="text-xs text-gray-500 mb-2">
                                        {post.comments.length} comments
                                    </p>
                                )}
                                <div className="space-y-2">
                                    {post.comments.slice(-2).map((comment, commentIndex) => (
                                        <div key={comment.id || commentIndex} className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                {comment.user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-semibold">{comment.user?.fullname || 'User'}</span>
                                                    {' '}{comment.content}
                                                    <button
                                                        className="ml-2 text-xs text-red-500 hover:underline"
                                                        onClick={() => handleDelete(comment.id)}
                                                    >
                                                        Hapus
                                                    </button>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Unknown date'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comment Input */}
                        <div className="px-4 py-2 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 w-full">
                                    <FaceSmileIcon className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="text-sm py-2 outline-none flex-1"
                                        value={commentInputs[post.id] || ""}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        onKeyPress={(e) => handleKeyPress(e, post.id)}
                                        disabled={submittingComments[post.id]}
                                    />
                                </div>
                                <button 
                                    className={`text-sm font-semibold ${
                                        commentInputs[post.id]?.trim() && !submittingComments[post.id]
                                            ? 'text-blue-500 hover:text-blue-600'
                                            : 'text-gray-400 cursor-not-allowed'
                                    }`}
                                    onClick={() => handleSubmitComment(post.id)}
                                    disabled={!commentInputs[post.id]?.trim() || submittingComments[post.id]}
                                >
                                    {submittingComments[post.id] ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                    <div className="flex items-center justify-center p-8">
                        <div className="text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No Posts Yet
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Be the first to create a post!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}