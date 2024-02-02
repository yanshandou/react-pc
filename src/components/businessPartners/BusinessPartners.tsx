import React from "react";
// 导入antd库的一些组件：Row、Col、Typography和Divider
import { Row, Col, Typography, Divider } from "antd";
// 从react-i18next库导入useTranslation钩子，用于实现多语言功能
import { useTranslation } from "react-i18next";
// 引入CSS样式文件
import styles from "./BusinessPartners.modules.css";
// 从assets目录导入图片文件
import image1 from "../../assets/images/microsoft-80658_640.png";
import image2 from "../../assets/images/icon-720944_640.png";
import image3 from "../../assets/images/follow-826033_640.png";
import image4 from "../../assets/images/facebook-807588_640.png";
// 创建一个对象数组来表示合作公司，每个对象包含公司的名称和logo图片
const companies = [
	{ src: image1, title: "Microsoft" },
	{ src: image2, title: "Youtube" },
	{ src: image3, title: "Ins" },
	{ src: image4, title: "Facebook" },
];
// 定义BusinessPartners组件
export const BusinessPartners: React.FC = () => {
	const { t } = useTranslation(); // 使用useTranslation钩子获取t函数
	return (
		<div className={styles.content}>
			<Divider orientation="left">
				<Typography.Title level={3}>
					{t("home_page.joint_venture")} {/* 使用t函数获取当前语言对应的文本 */}
				</Typography.Title>
			</Divider>
			<Row>
				{/* 遍历companies数组，为每个公司生成一个Col组件，其中包含一个图片组件，用于显示公司的logo */}
				{companies.map((c, index) => (
					<Col span={6} key={"business-partner-" + index}>
						<img
							alt="business-partner"
							src={c.src}
							style={{
								width: "80%",
								display: "block",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
};
