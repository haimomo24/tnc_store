import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        avatar: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        console.log('Raw user string:', userStr);
        
        if (userStr) {
            const user = JSON.parse(userStr);
            console.log('Parsed user data:', user);
            
            setUserData({
                fullName: user.fullName ,
                avatar: user.avatar 
            });
        } else {
            navigate('/login');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="bg-gray-100">
            <header className="flex justify-between items-center bg-[#111827] p-4">
                <div className="left-section">
                </div>
                <div className="right-section flex items-center space-x-4">
                    <div className="flex items-center px-4 -mx-2">
                        <img
                            className="object-cover mx-2 rounded-full h-9 w-9"
                            src={userData.avatar}
                            alt="avatar"
                            
                        />
                        
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                    >
                        Đăng xuất
                    </button>
                </div>
            </header>
        </div>
    );
};

export default HeaderAdmin;
