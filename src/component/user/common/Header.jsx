import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const handleAvatarClick = () => {
        if (user && user.level === 2) {
            navigate('/dashboard');
        }
        else if (user.level === 1) {
            navigate('/editprofile');
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" onClick={handleLogoClick} className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-12 w-auto"
                            src="data:image/jpeg;base64,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"
                            
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Home
                    </Link>
                    <Link to="/product" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Products
                    </Link>
                    <Link to="/contact" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Contact
                    </Link>
                    <Link to="/news" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        News
                    </Link>
                    <Link to="/cartshoping" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Cart shopping
                    </Link>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div 
                                    className={`relative group ${user.level === 2 ? 'cursor-pointer' : ''}`}
                                    onClick={handleAvatarClick}
                                >
                                    <img
                                        src={user.avatar}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover transition-transform duration-200 ease-in-out transform group-hover:scale-110"
                                    />
                                    {user.level === 2 && (
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2">
                                            Dashboard
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{user.fullName}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm/6 font-semibold text-gray-900 hover:text-red-600 transition-colors duration-200 flex items-center gap-2"
                                title="Logout"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/login" 
                            className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors duration-200"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
