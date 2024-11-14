import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const OderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
      fetchOrders();
      const savedChecks = localStorage.getItem('checkedOrders');
      if (savedChecks) {
        setCheckedOrders(JSON.parse(savedChecks));
      }
    }, []);

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const handleDelete = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        try {
          const response = await fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            fetchOrders();
            const newCheckedOrders = { ...checkedOrders };
            delete newCheckedOrders[id];
            setCheckedOrders(newCheckedOrders);
            localStorage.setItem('checkedOrders', JSON.stringify(newCheckedOrders));
          }
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      }
    };

    const handleCheck = (orderId) => {
      const newCheckedOrders = {
        ...checkedOrders,
        [orderId]: !checkedOrders[orderId]
      };
      setCheckedOrders(newCheckedOrders);
      localStorage.setItem('checkedOrders', JSON.stringify(newCheckedOrders));
    };

    const formatCurrency = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <div className='bg-slate-600 h-auto mt-[-50px]'>
      <div className='bg-slate-600 h-auto mt-[-50px]'>
        <div className='flex justify-end bg-[#111827]'>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Tên sản phẩm</th>
                <th scope="col" className="px-6 py-3">Người đặt</th>
                <th scope="col" className="px-6 py-3">Số điện thoại</th>
                <th scope="col" className="px-6 py-3">Địa chỉ</th>
                <th scope="col" className="px-6 py-3">Giá</th>
                <th scope="col" className="px-6 py-3">Ngày đặt</th>
                <th scope="col" className="px-6 py-3">Trạng thái</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.name}
                  </th>
                  <td className="px-6 py-4">{order.name_user}</td>
                  <td className="px-6 py-4">{order.phone}</td>
                  <td className="px-6 py-4">{order.Address}</td>
                  <td className="px-6 py-4">{formatCurrency(order.price)}</td>
                  <td className="px-6 py-4">{order.day}</td>
                  <td className="px-6 py-4">
                    {checkedOrders[order.id] ? 'Đã xử lý' : 'Chưa xử lý'}
                  </td>
                  <td className='flex px-6 py-4'>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleCheck(order.id)}
                      className={`ml-4 w-6 h-6 flex items-center justify-center border rounded ${
                        checkedOrders[order.id] ? 'bg-green-500 text-white' : 'border-gray-400'
                      }`}
                    >
                      {checkedOrders[order.id] && <FontAwesomeIcon icon={faCheck} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <div className="inline-flex rounded-md shadow-sm">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 text-sm font-medium ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === totalPages - 1 ? 'rounded-r-lg' : ''
                } ${
                  currentPage === index + 1
                    ? 'z-10 bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OderAdmin;
