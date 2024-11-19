import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState('');
    const productsPerPage = 9;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://server-tnc-production.up.railway.app/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };
    const handleBrandFilter = (brand) => {
        setSelectedBrand(brand);
        if (brand === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(brand.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
        setCurrentPage(1);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sorted = [...filteredProducts].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            }
            return 0;
        });
        setFilteredProducts(sorted);
        setCurrentPage(1);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Không tìm thấy sản phẩm
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
                <div className="flex flex-col items-center justify-center mb-8 space-y-4">
                    <form className="max-w-md w-full" onSubmit={handleSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </form>


                </div>

                <div className="mb-16">
                    <div className="flex flex-wrap gap-4 p-4">
                        <div className="flex flex-wrap gap-4 p-4">
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'MacBook' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('MacBook')}
                            >
                                <p className="text-gray-800">MacBook</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'ASUS' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('ASUS')}
                            >
                                <p className="text-gray-800">ASUS</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'Lenovo' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('Lenovo')}
                            >
                                <p className="text-red-600">Lenovo</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'MSI' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('MSI')}
                            >
                                <p className="text-gray-800">MSI</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'Acer' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('Acer')}
                            >
                                <p className="text-green-500">Acer</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'HP' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('HP')}
                            >
                                <p className="text-blue-600">HP</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'Dell' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('Dell')}
                            >
                                <p className="text-blue-800">Dell</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'LG' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('LG')}
                            >
                                <p className="text-gray-600">LG</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'Huawei' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('Huawei')}
                            >
                                <p className="text-red-500">Huawei</p>
                            </button>
                            <button
                                className={`border border-gray-300 rounded-lg p-2 w-24 text-center ${selectedBrand === 'GIGABYTE' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleBrandFilter('GIGABYTE')}
                            >
                                <p className="text-blue-600">GIGABYTE</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mb-8">
                    <div className="w-64">
                        <select
                            className="w-full p-4 border border-gray-300 rounded-lg bg-white outline-none text-sm text-gray-900"
                            value={sortOrder}
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="">Lọc</option>
                            <option value="asc">Giá thấp đến cao</option>
                            <option value="desc">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>



                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="relative h-72 p-4">
                                <img
                                    src={`https://server-tnc-production.up.railway.app${product.image}`} 
                                    alt={product.name}
                                    className="w-full h-full object-contain object-center"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg'; 
                                        e.target.onerror = null; 
                                    }}
                                />
                            </div>

                            <div className="p-6 space-y-3 border-t">
                                <p className="text-gray-700">{product.name}</p>
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

                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        ⬅️
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        ➡️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
