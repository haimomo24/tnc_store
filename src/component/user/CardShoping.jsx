import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartShopping = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    const cartKey = `cart_${user.id}`;
    const items = JSON.parse(localStorage.getItem(cartKey) || '[]');
    setCartItems(items);
    calculateTotal(items);
  }, [navigate]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cartKey = `cart_${user.id}`;
    
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: parseInt(newQuantity) };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem(cartKey, JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cartKey = `cart_${user.id}`;
    
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem(cartKey, JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }
    navigate('/pay', { state: { cartItems, totalAmount } });
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Giỏ hàng của tôi</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Sản phẩm</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
              <Link to="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                  <div className="md:w-4/12 2xl:w-1/4 w-full">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="h-full object-center object-cover md:block hidden"
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Mã SP: {item.id}</p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-black leading-none text-gray-800">
                        {item.name}
                      </p>
                      <select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-5">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-xs leading-3 underline text-red-500 cursor-pointer"
                      >
                        Xóa sản phẩm
                      </button>
                      <p className="text-base font-black leading-none text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </>
          )}
        </div>

        <div id="summary" className="w-full sm:w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Tổng đơn hàng</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Số lượng: {cartItems.length}</span>
            <span className="font-semibold text-sm">{formatCurrency(totalAmount)}</span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng tiền</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShopping;
