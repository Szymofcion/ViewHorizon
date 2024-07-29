import React from "react";

const DesktopNav = () => {
    return (
        <div className="flex items-center">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
                className="h-8"
            />
            <nav className="ml-8 space-x-4 hidden md:flex">
                <a href="#" className="hover:text-gray-400">
                    Home
                </a>
                <a href="#" className="hover:text-gray-400">
                    TV Shows
                </a>
                <a href="#" className="hover:text-gray-400">
                    Movies
                </a>
                <a href="#" className="hover:text-gray-400">
                    New & Popular
                </a>
                <a href="#" className="hover:text-gray-400">
                    My List
                </a>
            </nav>
        </div>
    );
};

export default DesktopNav;
