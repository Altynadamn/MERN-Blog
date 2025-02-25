import { Link } from "react-router-dom";
import { IF } from "../url";

// eslint-disable-next-line react/prop-types
const ProfilePosts = ({ p }) => {
    return (
        <div className="w-full flex mt-8 space-x-4">
            {/* Left: Clickable Image */}
            {/* eslint-disable-next-line react/prop-types */}
            <Link to={`/post/${p._id}`} className="w-[35%] h-[200px] flex justify-center items-center bg-gray-200">
                {/* eslint-disable-next-line react/prop-types */}
                {p.photo ? (
                    // eslint-disable-next-line react/prop-types
                    <img src={IF + p.photo} alt="Post" className="h-full w-full object-cover" />
                ) : (
                    <p className="text-gray-500">No Image</p>
                )}
            </Link>
            {/* Right: Content */}
            <div className="flex flex-col w-[65%]">
                {/* Clickable Title */}
                {/* eslint-disable-next-line react/prop-types */}
                <Link to={`/post/${p._id}`} className="text-xl font-bold md:mb-2 mb-1 md:text-2xl hover:underline">
                    {/* eslint-disable-next-line react/prop-types */}
                    {p.title}
                </Link>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                    {/* eslint-disable-next-line react/prop-types */}
                    <p>@{p.username}</p>
                    <div className="flex space-x-2 text-sm">
                        {/* eslint-disable-next-line react/prop-types */}
                        <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                </div>
                {/* eslint-disable-next-line react/prop-types */}
                <p className="text-sm md:text-lg">{p.desc.slice(0, 200) + " ...Read more"}</p>
            </div>
        </div>
    );
};

export default ProfilePosts;
