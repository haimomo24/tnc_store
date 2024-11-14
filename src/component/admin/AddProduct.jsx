import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'laptop',
        ram: '',
        sd: '',
        cpu: '',
        card: '',
        manhinh: ''
    });

    const [imageFiles, setImageFiles] = useState({
        image: null,
        imagge_2: null,
        image_3: null
    });

    const [previews, setPreviews] = useState({
        preview1: '',
        preview2: '',
        preview3: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e, imageNumber) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                setMessage('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setMessage('Vui lòng chỉ chọn file hình ảnh');
                return;
            }

            const fieldMap = {
                1: 'image',
                2: 'imagge_2',
                3: 'image_3'
            };

            setImageFiles(prev => ({
                ...prev,
                [fieldMap[imageNumber]]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({
                    ...prev,
                    [`preview${imageNumber}`]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const requiredFields = {
            name: 'Tên sản phẩm',
            price: 'Giá',
            description: 'Mô tả',
            category: 'Danh mục',
            cpu: 'CPU',
            ram: 'RAM',
            sd: 'Ổ cứng',
            manhinh: 'Màn hình',
            card: 'Card đồ họa'
        };

        const emptyFields = Object.entries(requiredFields)
            .filter(([key]) => !formData[key])
            .map(([, label]) => label);

        if (emptyFields.length > 0 || !imageFiles.image) {
            const errorMessage = `Vui lòng điền: ${emptyFields.join(', ')}${!imageFiles.image ? ' và chọn ít nhất 1 hình ảnh' : ''}`;
            setMessage(errorMessage);
            setLoading(false);
            return;
        }

        const submitData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            submitData.append(key, value);
        });

        if (imageFiles.image) submitData.append('image', imageFiles.image);
        if (imageFiles.imagge_2) submitData.append('imagge_2', imageFiles.imagge_2);
        if (imageFiles.image_3) submitData.append('image_3', imageFiles.image_3);

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                body: submitData
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Thêm sản phẩm thành công!');
                setTimeout(() => {
                    navigate('/dashboard/productadmin');
                }, 2000);
            } else {
                throw new Error(data.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            setMessage(`Lỗi: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-[-50px] ">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Thêm Sản Phẩm Mới</h2>
            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Danh mục</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="laptop">Laptop</option>
                            <option value="gaming">Gaming</option>
                            <option value="macbook">Macbook</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">CPU</label>
                        <input
                            type="text"
                            name="cpu"
                            value={formData.cpu}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Thông số CPU"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">RAM</label>
                        <input
                            type="text"
                            name="ram"
                            value={formData.ram}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Dung lượng RAM"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Ổ cứng</label>
                        <input
                            type="text"
                            name="sd"
                            value={formData.sd}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Thông số ổ cứng"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Card đồ họa</label>
                        <input
                            type="text"
                            name="card"
                            value={formData.card}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Thông số card đồ họa"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Màn hình</label>
                        <input
                            type="text"
                            name="manhinh"
                            value={formData.manhinh}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Thông số màn hình"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Mô tả</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        rows="4"
                        placeholder="Nhập mô tả sản phẩm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-bold">Hình ảnh chính</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 1)}
                            className="w-full"
                        />
                        {previews.preview1 && (
                            <img
                                src={previews.preview1}
                                alt="Preview 1"
                                className="h-32 w-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-bold">Hình ảnh phụ 1</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 2)}
                            className="w-full"
                        />
                        {previews.preview2 && (
                            <img
                                src={previews.preview2}
                                alt="Preview 2"
                                className="h-32 w-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-bold">Hình ảnh phụ 2</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 3)}
                            className="w-full"
                        />
                        {previews.preview3 && (
                            <img
                                src={previews.preview3}
                                alt="Preview 3"
                                className="h-32 w-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
