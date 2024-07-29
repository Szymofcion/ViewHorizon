import React from "react";

import HamburgerNav from "@/ui/HamburgerNav";

const MobileNav = ({ isMenuOpen, toggleMenu }) => {
    return (
        <div>
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#" className="hover:text-gray-400">
                        Search
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Kids
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        DVD
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Notifications
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Profile
                    </a>
                </div>
            </div>
            <HamburgerNav toggleMenu={toggleMenu} />
            {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-4 md:hidden">
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        TV Shows
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Movies
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        New & Popular
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        My List
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Search
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Kids
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        DVD
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Notifications
                    </a>
                    <a
                        href="#"
                        className="text-white text-xl hover:text-gray-400"
                    >
                        Profile
                    </a>
                    <button
                        className="mt-4 text-gray-400 hover:text-white"
                        onClick={toggleMenu}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
