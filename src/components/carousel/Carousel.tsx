import React from "react"; // 导入React库
import styles from "./Carousel.module.css"; // 导入样式文件
import { Image, Carousel as AntCarousel } from "antd"; // 从antd库中导入Image和Carousel组件

// 导入轮播图的图片资源
import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";

// 定义并导出Carousel组件，无任何传入参数
export const Carousel: React.FC = () => {
	return (
		// 使用antd的Carousel组件，并启用自动播放，应用样式
		// AntCarousel 是 Ant Design（一种流行的基于 React 的 UI 设计语言）中的一个组件，用于创建轮播效果，可以在网页上展示一系列的图片或内容，通常用于展示特色产品、广告或其他重要内容，支持自动播放、手动控制等功能。
		<AntCarousel autoplay className={styles.slider}>
			{/* 分别添加三张图片作为轮播图展示 */}
			<Image src={carouselImage1} />
			<Image src={carouselImage2} />
			<Image src={carouselImage3} />
		</AntCarousel>
	);
};
