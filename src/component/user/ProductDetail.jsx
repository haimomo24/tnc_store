import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, similarResponse] = await Promise.all([
          fetch(`http://localhost:5000/products/${id}`),
          fetch(`http://localhost:5000/products?_limit=4`)
        ]);

        if (!productResponse.ok) {
          throw new Error('Không tìm thấy sản phẩm');
        }

        const [productData, similarData] = await Promise.all([
          productResponse.json(),
          similarResponse.json()
        ]);

        setProduct(productData);
        setMainImage(`http://localhost:5000${productData.image}`);
        setSimilarProducts(
          similarData
            .filter(p => p.id !== productData.id)
            .slice(0, 3)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleImageClick = (imagePath) => {
    setMainImage(`http://localhost:5000${imagePath}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleViewDetail = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      navigate('/login');
      return;
    }
  
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn thêm sản phẩm này vào giỏ hàng?');
    
    if (isConfirmed) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      };
      
      const cartKey = `cart_${user.id}`;
      const userCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      
      const existingItemIndex = userCart.findIndex(item => item.id === cartItem.id);
      
      if (existingItemIndex > -1) {
        userCart[existingItemIndex].quantity += quantity;
      } else {
        userCart.push(cartItem);
      }
      
      localStorage.setItem(cartKey, JSON.stringify(userCart));
      navigate('/cartshoping');
    }
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Phần Hình ảnh */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 lg:aspect-w-4 lg:aspect-h-3">
              <img
                src={mainImage}
                alt={product?.name}
                className="w-full h-[400px] object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[product?.image, product?.imagge_2, product?.image_3].map((img, index) => (
                img && (
                  <img
                    key={index}
                    src={`http://localhost:5000${img}`}
                    alt={`Hình ${index + 1}`}
                    className={`cursor-pointer rounded-lg hover:opacity-75 transition-opacity duration-200 
                      h-24 w-full object-contain ${
                      mainImage === `http://localhost:5000${img}` ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleImageClick(img)}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                      e.target.onerror = null;
                    }}
                  />
                )
              ))}
            </div>
          </div>

          {/* Phần Thông tin sản phẩm */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
              <p className="mt-4 text-4xl text-red-500">
                {formatCurrency(product?.price)}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Thông số kỹ thuật</h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {[
                    { label: 'Bộ vi xử lý', value: product?.cpu },
                    { label: 'Bộ nhớ RAM', value: product?.ram },
                    { label: 'Ổ cứng', value: product?.sd },
                    { label: 'Card đồ họa', value: product?.card },
                    { label: 'Màn hình', value: product?.manhinh }
                  ].map((spec, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium text-gray-500">{spec.label}</p>
                      <p className="mt-1 text-sm text-gray-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Mô tả sản phẩm</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                {product?.description}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Sản phẩm tương tự */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-full h-48 object-contain"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                    e.target.onerror = null;
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-red-500 font-medium">{formatCurrency(item.price)}</p>
                  <button
                    onClick={() => handleViewDetail(item.id)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
            aria-label="Về đầu trang"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
