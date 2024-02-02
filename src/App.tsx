import React, { useEffect } from "react"; // 导入React库和useEffect hook
import styles from "./App.module.css"; // 导入样式模块
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 导入路由相关组件
// 导入各个页面组件
import {
	HomePage,
	SignInPage,
	RegisterPage,
	DetailPage,
	SearchPage,
	ShoppingCartPage,
	PlaceOrderPage,
	NotFoundPage,
} from "./pages";
import { Navigate } from "react-router-dom"; // 导入导航组件
import { useSelector, useAppDispatch } from "./redux/hooks"; // 导入自定义的Redux hooks
import { getShoppingCart } from "./redux/shoppingCart/slice"; // 导入获取购物车的action creator
// 创建一个PrivateRoute，如果用户没有登录（即jwt为空），则跳转到登录页面
const PrivateRoute = ({ children }) => {
	const jwt = useSelector((s) => s.user.token);
	return jwt ? children : <Navigate to="/signIn" />;
};
function App() {
	const jwt = useSelector((s) => s.user.token); // 获取用于鉴权的jwt token
	const dispatch = useAppDispatch(); // 获取dispatch函数，用于发送action
	// 当jwt发生改变时（即用户登录状态改变时），获取购物车内容
	useEffect(() => {
		if (jwt) {
			dispatch(getShoppingCart(jwt));
		}
	}, [jwt]);
	// 在BrowserRouter中设置路由，并在对应的路由上渲染对应的组件
	return (
		<div className={styles.App}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/detail/:touristRouteId" element={<DetailPage />} />
					<Route path="/search/:keywords" element={<SearchPage />} />
					// 定义路由
					<Route
						path="/shoppingCart" // 当访问路径为 "/shoppingCart" 时
						element={
							// 使用 PrivateRoute 组件包装，以实现路由守卫，只有在符合某些条件（例如用户已登陆）时才能访问
							<PrivateRoute>
								{/* 渲染的页面组件为 ShoppingCartPage */}
								<ShoppingCartPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/placeOrder"
						element={
							<PrivateRoute>
								<PlaceOrderPage />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App; // 导出App组件
