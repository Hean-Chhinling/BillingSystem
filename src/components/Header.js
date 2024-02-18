import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, setMenuOpen }) => {
    const [menuOpenLocal, setMenuOpenLocal] = useState(false);
    const [showProfileLink, setShowProfileLink] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setShowProfileLink(true);
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    const toggleMenu = () => {
        setMenuOpenLocal(!menuOpenLocal);
        setMenuOpen(!menuOpenLocal);
    }

    const closeMenu = () => {
        setMenuOpenLocal(false);
        setMenuOpen(false);
    }

    console.log("Header Menu Open: ", menuOpenLocal);
    return (
        <header className="bg-green-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-1lg lg:text-2xl xl:text-3xl font-semibold text-white ">BillingSystem</div>

                    {/* On a small screenn, show a "hamburger" icon */}

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-blue-300 transition duration-300"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${menuOpenLocal ? 'hidden' : 'block'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={menuOpenLocal ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </button>
                
                    </div>

                    {/* 'a' tag is not working properly when deploy */}

                    <nav className={`space-x-20 md:space-x-20 ${menuOpenLocal ? 'block' : 'hidden'} md:flex md:space-x-4 `} 
                        style={menuOpenLocal ? { zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'} : {}}>
                        <Link to="/" onClick={closeMenu} className="block text-white hover:text-green-300 transition duration-300" style={menuOpenLocal ? { marginLeft: '80px'} : {}}>
                            Home
                        </Link>
                        
                        <Link to="/calculation" onClick = {closeMenu} className="block text-white hover:text-green-300 transition duration-300">
                            Calculate
                        </Link>

                        <Link to="/about" onClick = {closeMenu} className="block text-white hover:text-green-300 transition duration-300">
                            About
                        </Link>

                        {showProfileLink && isAuthenticated && (
                            <Link to="/dashboard" onClick = {closeMenu} className="block text-white hover:text-green-300 transition duration-300">
                                Profile
                            </Link>
                        )}
                    </nav>
                  
            </div>


        </header>
    );
}

export default Header;