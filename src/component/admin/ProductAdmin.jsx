import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faArrowLeft, faArrowRight);


const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 7;

    const Notification = ({ message, type }) => (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transition-opacity duration-500`}>
            <div className="flex items-center">
                {type === 'success' ? (
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
                <span>{message}</span>
            </div>
        </div>
    );

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://server-tnc-production.up.railway.app/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const response = await fetch(`https://server-tnc-production.up.railway.app/products/${id}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                if (response.ok) {
                    showNotification('Xóa sản phẩm thành công', 'success');
                    fetchProducts();
                } else {
                    showNotification(data.error, 'error');
                }
            } catch (error) {
                showNotification('Có lỗi xảy ra khi xóa sản phẩm', 'error');
            }
        }
    };

    const formatPriceVND = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Pagination calculations
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    return (
        <div className='bg-slate-600 h-auto mt-[-50px]'>
            {notification.show && (
                <Notification message={notification.message} type={notification.type} />
            )}
            <div className='flex justify-end bg-[#111827]'>
                <Link to='/dashboard/addproduct'>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
                        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        ADD
                    </button>
                </Link>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Cpu</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">{product.cpu}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{formatPriceVND(product.price)}</td>
                                <td className='flex px-6 py-4'>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <a href={`/dashboard/productadmin/editproduct/${product.id}`}>
                                        <button className="text-blue-500 hover:text-blue-700 ml-4">
                                            <FontAwesomeIcon icon={['fas', 'edit']} className="text-blue-500 hover:text-blue-700 transition-colors duration-200" />
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

              
            </div>
            <div className="flex justify-center mt-8 space-x-2 pb-4">
    <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
            currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
    >
        <FontAwesomeIcon icon={['fas', 'arrow-left']} /> Trước
    </button>

    {[...Array(totalPages)].map((_, index) => (
        <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
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
        className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
    >
        Sau <FontAwesomeIcon icon={['fas', 'arrow-right']} />
    </button>
</div>

        </div>
    );
};

export default ProductAdmin;
