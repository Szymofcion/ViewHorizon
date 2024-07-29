"use client";

import React, { useState } from "react";
import MobileNav from "@/ui/MobileNav";
import DesktopNav from "@/ui/DesktopNav";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gradient-to-b from-black text-white">
            <DesktopNav />
            <MobileNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </header>
    );
};

export default Nav;
