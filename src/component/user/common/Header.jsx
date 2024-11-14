import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
                    <a href="/" onClick={handleLogoClick} className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-12 w-auto"
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/368725784_695682005920092_1940464881160114044_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=CBfSaYEHa8sQ7kNvgGgU-yK&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=ADCmpmKiNZvKOt2sZK6qQdT&oh=00_AYA58QIme_W7FWy369uoxOr5aN7x8nYS_nGYSn6fWczmoA&oe=6737A74C"
                            alt="Company Logo"
                        />
                    </a>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    <a href="/" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Home
                    </a>
                    <a href="/product" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Products
                    </a>
                    <a href="/contact" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Contact
                    </a>
                    <a href="/news" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        News
                    </a>
                    <a href="/cartshoping" className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors">
                        Cart shopping
                    </a>
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
                        <a 
                            href="/login" 
                            className="text-sm/6 font-semibold text-gray-900 hover:text-yellow-400 transition-colors duration-200"
                        >
                            Log in
                        </a>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
