import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const navigate = useNavigate();
    const defaultAvatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar-icon%2F5&psig=AOvVaw3u1yksJLpx98yv60Qi88Xo&ust=1731577274896000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCal5WC2YkDFQAAAAAdAAAAABAE";
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: '1',
        avatar: defaultAvatar,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!acceptTerms) {
            setError('Vui lòng đồng ý với điều khoản và chính sách để tiếp tục');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.error || 'Đã xảy ra lỗi khi kết nối tới server.');
        }
    };
    const handleTermsChange = (e) => {
        setAcceptTerms(e.target.checked);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br w-auto h-auto   py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Tạo tài khoản mới
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Hoặc{' '}
                        <Link to="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
                            đăng nhập nếu đã có tài khoản
                        </Link>
                    </p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Họ và tên
                        </label>
                        <input
                            name="fullname"
                            type="text"
                            required
                            value={formData.fullname}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Mật khẩu
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Số điện thoại
                        </label>
                        <input
                            name="phone"
                            type="text"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Địa chỉ
                        </label>
                        <input
                            name="address"
                            type="text"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    <div className="flex items-center">
            <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={handleTermsChange}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với <a href="#" className="text-yellow-500 hover:text-yellow-400">điều khoản</a> và <a href="#" className="text-yellow-500 hover:text-yellow-400">chính sách</a>
            </label>
        </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Register;
