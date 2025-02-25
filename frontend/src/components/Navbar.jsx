import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, BsPencil } from 'react-icons/bs'; // Added BsPencil for the Write button
import { FaUserCircle } from 'react-icons/fa'; // Added FaUserCircle for the profile icon
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : "/");
  };

  return (
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white shadow-lg">
        <h1 className="text-lg md:text-xl font-extrabold hover:text-gray-200 transition duration-300">
          <Link to="/">Blog App</Link>
        </h1>

        {path === "/" && (
            <div className="flex justify-center items-center space-x-2 bg-white rounded-full p-1">
              <input
                  onChange={(e) => setPrompt(e.target.value)}
                  className="outline-none px-3 py-1 rounded-full text-black"
                  placeholder="Search a post"
                  type="text"
              />
              <button
                  onClick={handleSearch}
                  className="p-2 bg-black rounded-full hover:bg-blue-700 transition duration-300"
              >
                <BsSearch className="text-white" />
              </button>
            </div>
        )}

        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
              <Link
                  to="/write"
                  className="p-2 hover:bg-blue-700 rounded-full transition duration-300"
              >
                <BsPencil className="text-white" />
              </Link>
          ) : (
              <Link to="/login" className="hover:text-gray-200 transition duration-300">
                Login
              </Link>
          )}
          {user ? (
              <div onClick={showMenu} className="relative">
                <button className="p-2 hover:bg-blue-700 rounded-full transition duration-300">
                  <FaUserCircle className="text-white text-2xl" /> {/* Profile icon */}
                </button>
                {menu && <Menu />}
              </div>
          ) : (
              <Link to="/register" className="hover:text-gray-200 transition duration-300">
                Register
              </Link>
          )}
        </div>

        <div onClick={showMenu} className="md:hidden text-lg">
          <button className="p-2 hover:bg-blue-700 rounded-full transition duration-300">
            <FaUserCircle className="text-white text-2xl" /> {/* Profile icon for mobile */}
          </button>
          {menu && <Menu />}
        </div>
      </div>
  );
};

export default Navbar;