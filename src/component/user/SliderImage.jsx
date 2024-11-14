import React, { useEffect, useState } from 'react'


const SliderImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://www.tncstore.vn/media/banner/WEB_BANNERTRANGCHUPCGAMINGGIATU8TR.jpg",
    "https://www.tncstore.vn/media/banner/banner-flash-sale-11-11.jpg", 
    "https://www.tncstore.vn/media/banner/banner-core-ultra.jpg"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Chuyển ảnh sau mỗi 3 giây

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  return (
    <div className="relative w-full overflow-hidden">
    {/* Container có chiều cao thay đổi theo màn hình */}
    <div className="h-[200px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
      {/* Ảnh slider */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-in-out flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Nút điều hướng - Ẩn trên mobile, hiện từ tablet trở lên */}
      {/* <button 
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Chấm tròn chỉ vị trí - Điều chỉnh kích thước theo màn hình */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all
              ${currentIndex === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
              }`}
          />
        ))}
      </div>
    </div>
  </div>
  )
}

export default SliderImage