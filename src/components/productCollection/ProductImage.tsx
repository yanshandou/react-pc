import React from "react";
import { Image, Typography } from "antd";
import { Link } from "react-router-dom";

// 定义PropsType接口来确定传入此组件的props数据类型
interface PropsType {
	id: string | number; // 产品id，可以是字符串或数字
	size: "large" | "small"; // 图片大小，可以是“大”或“小”
	imageSrc: string; // 图片的来源url
	price: number | string; // 产品价格，可以是数字或字符串
	title: string; // 产品标题
}

// 创建一个函数式组件ProductImage，该组件接受上述定义的PropsType作为props
export const ProductImage: React.FC<PropsType> = ({ id, size, imageSrc, price, title }) => {
	// 返回值是一个Link元素，它将id放置在URL中，并使用antd的Image和Typography组件展示图片和文字信息
	return (
		<Link to={`/detail/${id}`}>
			{size == "large" ? (
				<Image src={imageSrc} height={285} width={490} /> // 如果size为“large”，则设置图片高度为285px，宽度为490px
			) : (
				<Image src={imageSrc} height={120} width={240} /> // 如果size为“small”，则设置图片高度为120px，宽度为240px
			)}
			<div>
				<Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
				{/* 显示标题，如果它超过25个字符，则将其截断 */}
				<Typography.Text type="danger" strong>
					¥ {price} 起 {/* 显示价格 */}
				</Typography.Text>
			</div>
		</Link>
	);
};
