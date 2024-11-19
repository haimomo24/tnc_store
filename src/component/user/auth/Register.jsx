import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const navigate = useNavigate();
    const defaultAvatar = "data:image/png;base64,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";
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
            const response = await axios.post('https://tnc-store-oz66.vercel.app/register', formData);
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
