import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
    const [formData, setFormData] = useState({
      name_user: '',
      phone: '',
      Address: '',
    });
 
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
      }
    }, [navigate]);
 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
 
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('user'));
      
      const currentDate = new Date().toISOString().split('T')[0];
      
      const orderPromises = cartItems.map(item => {
        const orderData = {
          name: item.name,
          image: item.image,
          price: item.price,
          Address: formData.Address,
          phone: formData.phone,
          name_user: formData.name_user,
          day: currentDate
        };

        return fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });
      });

      try {
        await Promise.all(orderPromises);
        alert('Đơn hàng đã được xác nhận!');
        localStorage.setItem(`cart_${user.id}`, '[]');
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi đặt hàng!');
      }
    };
 
    const formatCurrency = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };
 
  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>
       
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between font-bold">
              <span>Tổng cộng:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Họ và tên</label>
            <input
              type="text"
              name="name_user"
              value={formData.name_user}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Địa chỉ nhận hàng</label>
            <textarea
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
          >
            Xác nhận đặt hàng
          </button>
        </form>
      </div>
    </div>
  )
}

export default Pay
