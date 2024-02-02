// 导入React库，使我们能够使用React功能
import React from "react";

// 导入样式表文件，为该模块提供样式处理
import styles from "./MainLayout.module.css";

// 从components子目录中导入Header和Footer组件，以便在此模块中使用这些组件
import { Header, Footer } from "../../components";

// PropsTypes接口定义了该组件接受的属性
interface PropsTypes {
	// children属性是一个React节点，表示被该组件包裹的子组件
	children: React.ReactNode;
}

// 创建并导出 MainLayout 函数组件，该组件接收一个属性（children)，这个属性是 React 节点类型
export const MainLayout: React.FC<PropsTypes> = ({ children }) => {
	// 返回一个 JSX 元素，由 Header, 内容部分和 Footer 组成。
	return (
		<>
			<Header /> {/* 这是头部组件 */}
			{/* 页面内容 content */}
			<div className={styles["page-content"]}>{children}</div>{" "}
			{/* 这是页面主要内容，"children" 代表的是被此 MainLayout 包裹的子元素 */}
			<Footer /> {/* 这是页脚组件 */}
		</>
	);
};
