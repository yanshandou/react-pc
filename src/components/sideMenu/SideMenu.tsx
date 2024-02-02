import React from "react";
import styles from "./SideMenu.module.css"; // 导入样式
import { sideMenuList } from "./mockup"; // 导入模拟的菜单数据
import { Menu } from "antd"; // 导入antd库中的Menu组件
import { GifOutlined } from "@ant-design/icons"; // 导入antd图标库中的GifOutlined图标

// 定义无状态的函数组件 SideMenu
export const SideMenu: React.FC = () => {
	// 返回一个Menu组件，其模式为垂直，样式名为"side-menu"
	// Menu的元素通过遍历sideMenuList生成
	return (
		<Menu
			mode="vertical"
			className={styles["side-menu"]}
			items={sideMenuList.map((m) => ({
				// 遍历一级菜单
				label: m.title, // 设置当前项的label值
				key: m.title, // 设置当前项的key值
				icon: <GifOutlined />, // 设置当前项的图标
				children: m.subMenu.map((sm) => ({
					// 遍历二级菜单
					label: sm.title,
					key: sm.title,
					icon: <GifOutlined />,
					children: sm.subMenu.map((sms) => ({
						// 遍历三级菜单
						label: sms,
						key: sms,
						icon: <GifOutlined />,
					})),
				})),
			}))}
		/>
	);
};
