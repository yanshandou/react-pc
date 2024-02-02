// 引入所需的库和组件
import React from "react";
import styles from "./ProductCollection.module.css";
import { Row, Col, Typography, Divider } from "antd";
import { ProductImage } from "./ProductImage";
// 定义组件接收的props类型
interface PropsType {
	title: JSX.Element;
	sideImage: string;
	products: any[];
}
// ProductCollection组件，展示一组产品图片
export const ProductCollection: React.FC<PropsType> = ({ title, sideImage, products }) => {
	return (
		// 产品集合外层容器
		<div className={styles.content}>
			{/* 分隔线，左侧带有标题 */}
			<Divider orientation="left">{title}</Divider>
			<Row>
				{/* 侧面图片 */}
				<Col span={4}>
					<img src={sideImage} className={styles["side-image"]} alt="" />
				</Col>
				{/* 产品图片区域 */}
				<Col span={20}>
					<Row>
						{/* 展示大图的格子 */}
						<Col span={12}>
							<ProductImage
								id={products[0].id}
								size={"large"}
								title={products[0].title}
								imageSrc={products[0].touristRoutePictures[0].url}
								price={products[0].price}
							/>
						</Col>
						{/* 展示小图的格子，共四个小图 */}
						<Col span={12}>
							<Row>
								{/* 第一个和第二个小图 */}
								<Col span={12}>
									<ProductImage
										id={products[1].id}
										size="small"
										title={products[1].title}
										imageSrc={products[1].touristRoutePictures[0].url}
										price={products[1].price}
									/>
								</Col>
								<Col span={12}>
									<ProductImage
										id={products[2].id}
										size="small"
										title={products[2].title}
										imageSrc={products[2].touristRoutePictures[0].url}
										price={products[2].price}
									/>
								</Col>
							</Row>
							<Row>
								{/* 第三个和第四个小图 */}
								<Col span={12}>
									<ProductImage
										id={products[3].id}
										size="small"
										title={products[3].title}
										imageSrc={products[3].touristRoutePictures[0].url}
										price={products[3].price}
									/>
								</Col>
								<Col span={12}>
									<ProductImage
										id={products[4].id}
										size="small"
										title={products[4].title}
										imageSrc={products[4].touristRoutePictures[0].url}
										price={products[4].price}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						{/* 展示最后一行四张小图的格子 */}
						<Col span={6}>
							<ProductImage
								id={products[5].id}
								size="small"
								title={products[5].title}
								imageSrc={products[5].touristRoutePictures[0].url}
								price={products[5].price}
							/>
						</Col>
						<Col span={6}>
							<ProductImage
								id={products[6].id}
								size="small"
								title={products[6].title}
								imageSrc={products[6].touristRoutePictures[0].url}
								price={products[6].price}
							/>
						</Col>
						<Col span={6}>
							<ProductImage
								id={products[7].id}
								size="small"
								title={products[7].title}
								imageSrc={products[7].touristRoutePictures[0].url}
								price={products[7].price}
							/>
						</Col>
						<Col span={6}>
							<ProductImage
								id={products[8].id}
								size="small"
								title={products[8].title}
								imageSrc={products[8].touristRoutePictures[0].url}
								price={products[8].price}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
