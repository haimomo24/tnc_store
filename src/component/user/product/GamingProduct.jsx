import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GamingProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('gaming');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                const filteredProducts = data
                    .filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase())
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3);

                setProducts(filteredProducts);
            } catch (error) {
                setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Không tìm thấy sản phẩm Gaming
                </h2>
                <p className="mt-4 text-gray-500">
                    Vui lòng thử lại sau hoặc liên hệ với chúng tôi để được hỗ trợ.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className=" mb-16">
                <h2 className="text-4xl  text-gray-900 mb-4">
                    Laptop gaming
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className="relative h-72 p-4">
                            <img
                                src={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-contain object-center"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>

                        <div className="p-6 space-y-3 border-t">
                        <p className="text-gray-700">
                                <span className="font-semibold font-bold"></span> {product.name}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">CPU:</span> {product.cpu}
                            </p>
                            <p className="text-2xl font-bold text-red-500">
                                {formatPrice(product.price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default GamingProduct;
