// 导入React库
import React from "react";
// 从react-dom/client导入ReactDOM
import ReactDOM from "react-dom/client";
// 导入应用程序的全局样式
import "./index.css";
// 导入主应用组件
import App from "./App";
// 导入Ant Design样式
import "antd/dist/antd.min.css";
// 导入国际化配置
import "./i18n/configs";
// 导入redux提供器，它将允许我们使用redux进行状态管理
import { Provider } from "react-redux";
// 导入我们的Redux store
import rootStore from "./redux/store";
// 导入axios库，我们将使用它来进行HTTP请求
import axios from "axios";
// 导入PersistGate，该组件用于维护Redux store的持久性
import { PersistGate } from "redux-persist/integration/react";
// 设置默认的axios头部信息，'x-icode'为F5F433A587BDBCC7
axios.defaults.headers["x-icode"] = "F5F433A587BDBCC7";
// 创建一个根渲染器
const root = ReactDOM.createRoot(
	// 将根元素的id定位为"root"
	document.getElementById("root") as HTMLElement
);
// 在React严格模式下渲染应用程序，此模式会检查潜在问题
root.render(
	<React.StrictMode>
		{/* 使用Provider包裹整个应用，使得整个应用都能访问到Redux store */}
		<Provider store={rootStore.store}>
			{/* 使用PersistGate包裹应用，它将延迟渲染直到持久化完成 */}
			<PersistGate persistor={rootStore.persistor}>
				{/* 渲染App组件 */}
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
