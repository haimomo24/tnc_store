import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: '1',
        avatar: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${id}`);
                const data = await response.json();
                console.log('Fetched user data:', data);
                setUser({
                    fullname: data.fullname || '',
                    email: data.email || '',
                    password: data.password || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    level: '1',
                    avatar: data.avatar || ''
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Updating field:', name, 'with value:', value);
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting user data:', user);

        try {
            const response = await fetch(`https://server-tnc-production.up.railway.app/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const result = await response.json();
            console.log('Update successful:', result);
            navigate('/dashboard/useradmin');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={user.fullname}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Avatar URL</label>
                    <input
                        type="text"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update User
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/useradmin')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
