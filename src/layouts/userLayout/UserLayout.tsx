import React from "react";
// 引入样式表
import styles from "./UserLayout.module.css";
// 引入logo图片
import logo from "../../assets/logo.svg";
// 引入路由组件Link
import { Link } from "react-router-dom";
// 引入Ant Design的图标组件
import { CaretDownOutlined } from "@ant-design/icons";
// 引入Ant Design的布局、菜单等组件
import { Layout, Menu, Dropdown, Button } from "antd";
// 定义Layout的子元素类型
const { Header, Footer, Content } = Layout;
// 定义Props接口
interface PropsTypes {
	children: React.ReactNode;
}
// 定义UserLayout组件
export const UserLayout: React.FC<PropsTypes> = (props) => {
	// 定义下拉菜单
	const menu = (
		<Menu>
			<Menu.Item>中文</Menu.Item>
			<Menu.Item>English</Menu.Item>
		</Menu>
	);
	// 返回主要布局
	return (
		<Layout className={styles["user-layout-container"]}>
			<Header className={styles["header"]}>
				<div className={styles["lang"]}>
					<Dropdown overlay={menu}>
						<Button>
							{" "}
							选择语言 <CaretDownOutlined />
						</Button>
					</Dropdown>
				</div>
			</Header>
			<Content className={styles["content"]}>
				<div className={styles["top"]}>
					<div className={styles["content-header"]}>
						{/* 定义站点logo和标题 */}
						<Link to="/">
							<img alt="logo" className={styles["logo"]} src={logo} />
							<span className={styles["title"]}>React 旅游网</span>
						</Link>
					</div>
					<div className={styles["desc"]}>旅游商城是一个在线平台，提供各类旅游相关产品和服务</div>
					{/* 嵌套子组件 */}
					{props.children}
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}> React 旅游网 ©2024 创建于深圳. 保留所有权利。</Footer>
		</Layout>
	);
};
