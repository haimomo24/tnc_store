-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2024 at 07:02 AM
-- Server version: 8.0.35
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lapdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `name` varchar(223) NOT NULL,
  `image` varchar(2232) NOT NULL,
  `price` varchar(223) NOT NULL,
  `Address` varchar(2234) NOT NULL,
  `phone` varchar(223) NOT NULL,
  `name_user` varchar(223) NOT NULL,
  `day` varchar(224) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `name`, `image`, `price`, `Address`, `phone`, `name_user`, `day`) VALUES
(1, 'MacBook Pro 16 inch M1 Max ', '/uploads/product-images/1731467652528.webp', '51000000', 'thôn 3 xã Phú Long , Huyện Nho Quan, Tỉnh Ninh Bình ', '0969591208', 'Đinh Tuấn Hải ', '14/11/2024'),
(4, 'MacBook Pro 16 inch M1 Max ', '/uploads/product-images/1731467652528.webp', '51000000', 'ngõ Trại Cá , Trương Định , Hà Nội ', '0969591208', 'Đinh Tuấn Hải ', '2024-11-14'),
(5, 'MacBook Pro 14 M3 Pro ', '/uploads/product-images/1731467432379.webp', '47000000', '23/53 lê văn lương ', '0973278123', 'vân anh ', '2024-11-14'),
(6, 'MacBook Pro 14 M3 Pro ', '/uploads/product-images/1731467432379.webp', '47000000', 'tập thể e3 thành công ba đình hà nội ', '0969591208', 'Đinh Tuấn Hải ', '2024-11-14'),
(8, 'Laptop ASUS TUF Gaming F15 FX507ZC4-HN095W', '/uploads/product-images/1731469202893.webp', '20000000', 'hoàng hoa thám ', '0973278123', 'vân anh ', '2024-11-14'),
(9, 'MacBook Pro 16 inch M1 Max ', '/uploads/product-images/1731467652528.webp', '51000000', 'lê thanh nghị ', '0973278123', 'vân anh ', '2024-11-14'),
(10, 'MacBook Pro 14 M3 Pro ', '/uploads/product-images/1731467432379.webp', '47000000', 'hà nam ', '09843242746', 'van anh ', '2024-11-14'),
(11, 'Laptop HP Pavilion 15-EG3111TU ', '/uploads/product-images/1731468608465.webp', '13000000', 'Số nhà 16 ngõ 255 lĩnh nam hoàng mai hà nội', '0969591208', 'Đinh Tuấn Hải', '2024-11-14');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `name` varchar(225) NOT NULL,
  `card` varchar(225) NOT NULL,
  `price` varchar(225) NOT NULL,
  `category` varchar(225) NOT NULL,
  `description` varchar(2250) NOT NULL,
  `cpu` varchar(225) NOT NULL,
  `ram` varchar(225) NOT NULL,
  `sd` varchar(225) NOT NULL,
  `manhinh` varchar(255) NOT NULL,
  `image` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagge_2` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_3` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `card`, `price`, `category`, `description`, `cpu`, `ram`, `sd`, `manhinh`, `image`, `imagge_2`, `image_3`) VALUES
(8, 'Laptop Dell Inspiron 5310', ' Intel Iris Xe Graphics', '20000000', 'laptop', 'Chiếc Laptop Dell Inspiron 5310 N3I5014W1 được thiết kế mỏng nhẹ, tiện lợi với trọng lượng 1,25kg các kích thước của máy là 296.78 x 210 x 15.9 mm. Kích thước và trọng lượng vô cùng nhỏ gọn khiến chiếc Laptop Dell này dễ dàng để mang theo bên mình mọi lúc mọi nơi phục vụ cho học tập và công việc. ', ' Intel Core i5-11320H ', ' 8GB DDR4 + 1slot (tối đa 16GB)', ' 256GB M.2 NVMe PCIe® 3.0 SSD', '14.0 inch, FHD (1920 x 1080) 16:9, LED Backlit, 220nits, 45% NTSC, Anti-glare display', '/uploads/product-images/1731320649203.jpg', '/uploads/product-images/1731320649208.png', '/uploads/product-images/1731320649208.jpg'),
(11, 'Apple MacBook Air M2 2022', '8 nhân GPU, 16 nhân Neural Engine', '25000000', 'macbook', 'Apple Macbook Air M2 2022 16GB 256GB không chỉ sở hữu ngoại hình siêu mỏng trong thiết kế đẳng cấp và lịch lãm mà còn sở hữu nguồn sức mạnh vượt trội khi được trang bị con chip Apple M2. Đây chính là một thiết bị tuyệt hảo đồng hành cùng bạn trong công việc cũng như giải trí.', 'Apple M2 8 nhân', '16GB', '256GB', 'Liquid Retina Display', '/uploads/product-images/1731466287208.webp', '/uploads/product-images/1731466287211.webp', '/uploads/product-images/1731466287211.jpg'),
(12, 'MacBook Pro 14 M3 Pro ', '14 nhân Neural Engine 16 nhân', '47000000', 'macbook', 'Macbook Pro M3 Pro bản 14 inch 18GB/512GB có khả năng lý đồ họa chuyên sâu, kết cấu 3D một cách ổn định và mượt mà. Bên cạnh đó, sản phẩm có chất lượng hiển thị rất sắc nét, và tần số quét lên tới 120Hz, giúp người dùng làm việc hiệu quả, nhanh chóng. ', 'Apple M3 Pro 11 nhân', '16GB', '512GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731467432379.webp', '/uploads/product-images/1731467432380.webp', '/uploads/product-images/1731467432381.jpg'),
(13, 'MacBook Pro 16 inch M1 Max ', '14 nhân Neural Engine 16 nhân', '51000000', 'macbook', 'Không chỉ là điểm nhận biết trên các thiết bị smartphone, hiện nay tai thỏ đã xuất hiện trên thế hệ Macbook mới nhất. Macbook Pro M1 Max với thiết kế độc đáo, màn hình chất lượng mang lại trải nghiệm vượt  trội. Máy tính Macbook Pro 16 inch 2021 được trang bị cấu hình cực khủng với chip Apple M1 Max với 10CPU, 32GPU đi kèm dung lượng lên đến RAM 32GB và bộ nhớ SSD 1TB mang lại hiệu suất vượt trội.', 'Apple M3 Pro 11 nhân', '16GB', '512GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731467652528.webp', '/uploads/product-images/1731467652529.jpg', '/uploads/product-images/1731467652529.webp'),
(14, 'Laptop HP Pavilion 15-EG3111TU ', ' Intel Iris Xe Graphics', '13000000', 'laptop', 'Laptop HP Pavilion 15 EG3111TU 8U6L8PA được xem là phù hợp để sử dụng trong các tác vụ học tập, làm việc với CPU I5-1335U, 2 thanh RAM 8GB bộ nhớ trong 512GB SSD. Việc giải trí trên máy cũng được tối ưu với kích thước màn hình 15.6 inch, hỗ trợ tấm nền IPS cùng độ phân giải 1920 x 1080 pixels. Sản phẩm laptop HP Pavilion này cũng sử dụng phiên bản Windows 11 mới nhất, hỗ trợ nhiều tiện ích cũng như tính năng mới.', 'Intel Core i5-1335U', '16GB', '256GB', 'Màn hình chống chói Độ sáng 250 nits Độ phủ màu 45% NTSC', '/uploads/product-images/1731468608465.webp', '/uploads/product-images/1731468608466.webp', '/uploads/product-images/1731468608467.webp'),
(15, 'Laptop ASUS TUF Gaming F15 FX507ZC4-HN095W', 'NVIDIA GeForce RTX 3050 4GB GDDR6 Intel Iris Xe Graphics', '20000000', 'gaming', 'Laptop Asus TUF Gaming F15 FX507ZC4-HN095W có ổ cứng SSD 512GB, với dung lượng RAM 16GB, giúp mang đến tốc độ truy cập thông tin ổn định và mượt mà hơn. Máy có màu sắc hiện đại, kích thước chỉ 35.4 x 25.1 x 2.24 ~ 2.49 cm không lo cồng kềnh khi mang theo. Bên cạnh đó, card đồ họa NVIDIA® GeForce RTX™ 3050, giúp nâng cao đồ họa sắc nét khi sử dụng. Bộ xử lý Intel® Core™ i5-12500H thế hệ 12, đáp ứng nhu cầu khác nhau của người dùng.', 'Intel Core i5-12500H 2.5 GHz ', '16GB', '512gb', '15.6 inches Độ phủ màu 45% NTSC, 62,50% sRGB, 47,34% Adobe Màn hình chống chói Adaptive-Sync', '/uploads/product-images/1731469202893.webp', '/uploads/product-images/1731469202894.webp', '/uploads/product-images/1731469202894.webp'),
(16, 'Laptop Asus VivoBook 14 X1402ZA', ' Intel Iris Xe Graphics', '12300000', 'laptop', 'Laptop Asus Gaming Vivobook K3605ZF-RP634W sở hữu bộ xử lý Intel Core i5-12500H đi cùng card đồ họa GeForce RTX 2050 4GB, dung lượng RAM và ổ cứng cao. Không những vậy, chiếc laptop Asus Gaming này còn trang bị màn hình IPS 16 inch với tần số quét 144Hz. Ngoài ra, dung lượng pin của máy cũng tương đối cao, đủ để sử dụng liên tục trong vài tiếng đồng hồ', ' Intel Core i5-1240P (upto 4.4 GHz, 12MB)', '16GB', '512GB', '14.0 inch, FHD (1920 x 1080) 16:9, LED Backlit, 220nits, 45% NTSC, Anti-glare display', '/uploads/product-images/1731481260491.webp', '/uploads/product-images/1731481260492.webp', '/uploads/product-images/1731481260492.webp'),
(17, 'Laptop MSI Cyborg 15 A12UCX-618VN', 'NVIDIA GeForce RTX 3050 4GB GDDR6 Intel Iris Xe Graphics', '16000000', 'gaming', 'Laptop MSI Cyborg 15 A12UCX-618VN sở hữu một cấu hình với con chip Intel® Core™ i5 thế hệ 12 cùng với bộ nhớ RAM đến 16GB mạnh mẽ. Cùng với đó, laptop còn sở hữu một vẻ ngoài sang trọng, đậm chất gaming. Laptop được trang bị ổ cứng SSD 512GB PCIe thoải mái lưu trữ cùng với card màn hình VGA NVIDIA GeForce RTX 2050.', ' Intel Core i5-11320H ', '16GB', '512GB', '15.6 inches Độ phủ màu 45% NTSC, 62,50% sRGB, 47,34% Adobe Màn hình chống chói Adaptive-Sync', '/uploads/product-images/1731481944394.webp', '/uploads/product-images/1731481944394.webp', '/uploads/product-images/1731481944394.webp'),
(18, 'Laptop Lenovo IdeaPad Slim 3 15 ABR8 82XM00EJVN', ' Intel Iris Xe Graphics', '12000000', 'laptop', 'Laptop Lenovo Ideapad Slim 3 15 ABR8 82XM00EJVN sở hữu CPU AMD Ryzen 5 7430U, RAM 16GB và ổ cứng SSD PCIe 512GB, card đồ họa tích hợp AMD Radeon. Mẫu laptop Lenovo Ideapad này có pin dùng bền bỉ và nhiều cổng kết nối như USB 3.2, USB-C, HDMI, jack tai nghe 3.5mm, khe đọc thẻ SD giúp tiện ích khi sử dụng.', 'Intel Core i5-1335U', ' 8GB DDR4 + 1slot (tối đa 16GB)', '256GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731482088506.webp', '/uploads/product-images/1731482088507.webp', '/uploads/product-images/1731482088507.webp'),
(19, 'Laptop Gaming Acer Nitro 5 Tiger AN515 58 52SP', 'NVIDIA GeForce RTX 3050 4GB GDDR6 Intel Iris Xe Graphics', '18000000', 'gaming', 'Laptop Acer Nitro 5 Tiger AN515-58-52SP mang vẻ ngoài phong thái sắc sảo, tích hợp hàng loạt công nghệ phần mềm đời mới và đặc biệt là bộ vi xử lý Intel ổn định. Chứa đựng hiệu năng siêu vượt trội đã góp phần làm nên chiếc laptop Acer Nitro 5 dẫn đầu phân khúc.', ' Intel Core i5-11320H ', '16GB', '512GB', '15.6 inches Độ phủ màu 45% NTSC, 62,50% sRGB, 47,34% Adobe Màn hình chống chói Adaptive-Sync', '/uploads/product-images/1731482318731.webp', '/uploads/product-images/1731482318731.webp', '/uploads/product-images/1731482318731.webp'),
(20, 'Laptop LG Gram 2023 14Z90RS', ' Intel Iris Xe Graphics', '27000000', 'laptop', 'Laptop LG Gram 2023 14Z90RS-G.AH54A5 là một dòng máy tính xách tay nhẹ và mạnh mẽ được phát hành vào năm 2023. Thông qua nhiều đặc điểm nổi bật, phiên bản laptop LG Gram 2023 này hứa hẹn sẽ mang đến những giây phút làm việc và giải trí tuyệt vời dành cho bạn.', 'Intel Core i5-1335U', '16GB', '512GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731483944230.webp', '/uploads/product-images/1731483944231.jpg', '/uploads/product-images/1731483944231.jpg'),
(21, 'Laptop Huawei Matebook D14', ' Intel Iris Xe Graphics', '9000000', 'laptop', 'Laptop Huawei Matebook D14 i3-1215U là model mới nhất thuộc dòng Matebook của Huawei. Với cấu hình trang bị vi xử lý thế hệ mới nhất của nhà Intel cùng màn hình lớn, mẫu laptop Huawei Macbook này là sự lựa chọn tối ưu cho người dùng công sở và giải trí.', 'Intel Core i5-1335U', '8gb', '256GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731484942842.webp', '/uploads/product-images/1731484942842.webp', '/uploads/product-images/1731484942842.webp'),
(22, 'Laptop Gigabyte G5 KF5-53VN353SH', 'NVIDIA GeForce RTX 3050 4GB GDDR6 Intel Iris Xe Graphics', '15000000', 'gaming', 'Với ngoại hình độc đáo, đậm chất gaming cùng cấu hình ấn tượng của mình mà laptop gaming Gigabyte G5 KF5 53VN353SH xứng đáng trở thành bạn đồng hành lý tưởng cho những trận chiến kịch tính và khốc liệt của các game thủ. Dưới đây là những đặc trưng nổi bật của mẫu laptop này: ', ' Intel Core i5-11320H ', '16GB', '512GB', '14.2 inches 3024 x 1964 pixels', '/uploads/product-images/1731557673745.webp', '/uploads/product-images/1731557673746.webp', '/uploads/product-images/1731557673750.webp');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `level` int NOT NULL,
  `avatar` varchar(2252) NOT NULL,
  `phone` int NOT NULL,
  `fullname` varchar(225) NOT NULL,
  `Address` varchar(2252) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `level`, `avatar`, `phone`, `fullname`, `Address`) VALUES
(1, 'admin@gmail.com', '123', 2, 'https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/356168813_977347816795896_2399918110406686120_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=maToZF8_LhQQ7kNvgFWo-zB&_nc_zt=24&_nc_ht=scontent.fhan14-5.fna&_nc_gid=ADKyA1WDqG82wlNxDYRLt8-&oh=00_AYBPyZPjPxKX1IpeMTiL1iCVPhhr1W_cJ1gl43Nd7RMeSA&oe=67379E22', 967578623, 'Đinh Tuấn Hải ', 'ninh bình '),
(2, 'vana@gmail.com', '1234', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&s', 967578620, 'Nguyễn Văn Anh ', 'Nam Định '),
(3, 'vananh@gmail.com', '1234', 1, 'https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg', 967578628, 'Lê Thị Vân Anh ', 'Hải Dương '),
(4, 'Haimoba@gmail.com', '1234567', 1, 'qưeqwe', 969591208, 'Đinh Tuấn Hải', 'Số nhà 16 ngõ 255 lĩnh nam hoàng mai hà nội'),
(5, 'anhganh@gmail.com', '123', 1, 'hầhsfajhsfjh', 909238422, 'ganh anh ', 'hà nội '),
(6, 'thanh@gmail.com', '123', 1, 'hdahsdhad', 93423948, 'dinh le phuong thanh ', 'ha nam '),
(8, 'thamediter@gmail.com', '123', 1, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar-icon%2F5&psig=AOvVaw3u1yksJLpx98yv60Qi88Xo&ust=1731577274896000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCal5WC2YkDFQAAAAAdAAAAABAE', 93474324, 'Hoàng Hoa Thám ', 'Bình dương '),
(9, 'luyensatthu@gmail.com', '123', 1, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar-icon%2F5&psig=AOvVaw3u1yksJLpx98yv60Qi88Xo&ust=1731577274896000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCal5WC2YkDFQAAAAAdAAAAABAE', 978654178, 'lê văn luyện ', 'Từ Sơn Bắc Ninh '),
(10, 'trum@gmail.com', '123', 1, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar-icon%2F5&psig=AOvVaw3u1yksJLpx98yv60Qi88Xo&ust=1731577274896000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCal5WC2YkDFQAAAAAdAAAAABAE', 974263576, 'đô na trum ', 'Hoa Kì ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
