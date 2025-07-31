import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../services/post.js";

export default function PostForm() {
    const [formData, setFormData] = useState({
        content: "",
        image_path: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (name === "image_path") {
            const file = files[0];
            setFormData({
                ...formData,
                [name]: file,
            });

            // Create preview for the image
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = new FormData();
            payload.append("content", formData.content);
            if (formData.image_path) {
                payload.append("image_path", formData.image_path);
            }

            await createPost(payload);
            navigate("/user/home");
        } catch (e) {
            console.error("Error creating post:", e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create New Post</h2>
            <p className="text-sm text-gray-500 mb-6">Fill out the details below to create a post.</p>

            {/* Content Field */}
            <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Write something about your post..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Cover Photo */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6">
                    {previewImage ? (
                        <div className="relative">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="max-h-60 mx-auto rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({...formData, image_path: null});
                                    setPreviewImage(null);
                                }}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                            <div className="mt-2 flex text-sm text-gray-600">
                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white font-medium text-indigo-600 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input
                                        id="image-upload"
                                        name="image_path"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}