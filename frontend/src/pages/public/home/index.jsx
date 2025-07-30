import { HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, FaceSmileIcon } from '@heroicons/react/24/outline'


export default function InstagramPost() {


    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-sm overflow-hidden">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        KF
                    </div>
                    <p className="text-sm font-semibold">kelasfullstack.id</p>
                </div>
                <EllipsisHorizontalIcon className="w-5 h-5 text-gray-800" />
            </div>

            {/* Image */}
            <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Instagram post"
                className="w-full aspect-square object-cover"
            />

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

            {/* Likes */}
            <div className="px-4">
                <p className="text-sm font-semibold">1,234 likes</p>
            </div>

            {/* Caption */}
            <div className="px-4 pt-1 pb-2">
                <p className="text-sm">
                    <span className="font-semibold">kelasfullstack.id</span>
                    {' '}Ngoding Jago... Bikin Website, Apasih yang nggak bisa..
                    <span className="text-blue-900/80"> #WebDevelopment</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>

            {/* Comments */}
            <div className="px-4 py-1 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-full">
                        <FaceSmileIcon className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="text-sm py-2 outline-none flex-1"
                        />
                    </div>
                    <button className="text-blue-500 font-semibold text-sm">Post</button>
                </div>
            </div>
        </div>
    )
}