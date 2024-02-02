// 导入React库和相关的hooks
import React, { useState, useEffect } from "react";
// 导入样式
import styles from "./Header.module.css";
// 导入logo图片
import logo from "../../assets/logo.svg";
// 导入antd库中的一些组件
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
// 导入全球图标
import { GlobalOutlined } from "@ant-design/icons";
// 导入react-router-dom库中的一些hooks
import { useParams, useLocation, useNavigate } from "react-router-dom";
// 导入redux hooks，用于管理应用状态
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
// 导入Redux的Dispatch类型（用于类型检查）
import { Dispatch } from "redux";
// 导入语言动作类型和动作创建函数
import {
	LanguageActionTypes,
	addLanguageActionCreator,
	changeLanguageActionCreator,
} from "../../redux/language/languageActions";
// 导入i18next库的useTranslation hook，用于实现多语言
import { useTranslation } from "react-i18next";
// 导入jwt-decode库，用于解析JWT令牌
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
// 导入用户切片，用于管理用户状态
import { userSlice } from "../../redux/user/slice";
// 扩展默认的JWT载荷接口，添加一个用于存储用户名的字段
interface JwtPayload extends DefaultJwtPayload {
	username: string; // 用户名字段
}
export const Header: React.FC = () => {
	// 使用React Router的useNavigate()获取导航函数，用于页面路由跳转
	const navigate = useNavigate();
	// 使用React Router的useLocation()获取当前位置(location)对象，包含当前URL信息等
	const location = useLocation();
	// 从 URL 中提取搜索关键字
	const searchKeyword = decodeURIComponent(location.pathname.split("/search/")[1] || "");

	// 使用React Router的useParams()获取路由参数
	const params = useParams();
	// 通过Redux的useSelector()从store中获取language state
	const language = useSelector((state) => state.language.language);
	// 通过Redux的useSelector()从store中获取languageList state
	const languageList = useSelector((state) => state.language.languageList);
	// 使用Redux的useDispatch()获取dispatch方法，用于派发action
	const dispatch = useDispatch();
	// 使用react-i18next的useTranslation()获取翻译函数t
	const { t } = useTranslation();
	// 通过Redux的useSelector()从store中获取jwt token
	const jwt = useSelector((s) => s.user.token);
	// 使用useState()创建username状态及其更新函数setUsername
	const [username, setUsername] = useState("");
	// 通过Redux的useSelector()从store中获取购物车商品列表
	// 在这段代码中， s 是一个形参（parameter），代表应用的全局状态（state）。在 Redux 中，这个全局状态通常包含了整个应用可能需要访问或更改的数据。在这具体的例子中， s.shoppingCart.items 就是从全局状态中读取购物车项目的数据
	const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
	// 通过Redux的useSelector()从store中获取购物车加载状态
	const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
	// 使用 useEffect 钩子函数在 jwt 发生变化时执行
	useEffect(() => {
		// 当 jwt 存在时
		if (jwt) {
			// 解码 jwt，得到的 JwtPayload 包含 username 等信息
			const token = jwt_decode<JwtPayload>(jwt);
			console.log("jwt decode:", token);
			
			// 设置 username 的状态值为 token 中的 username 值
			setUsername(Array.isArray(token.aud) ? token.aud[0] : token.aud ?? "");
		}
	}, [jwt]); // 对 jwt 的依赖，只有当 jwt 变化时才会重新运行此效应
	const menuClickHandler = (e) => {
		if (e.key === "new") {
			// 如果选中的是"新", 则派发一个添加语言的动作, 并设置其名称为"新语言"，id为"new_lang"
			dispatch(addLanguageActionCreator("新语言", "new_lang"));
		} else {
			// 否则, 派发一个改变语言的动作, 将应用的当前语言更改为用户所选的语言
			dispatch(changeLanguageActionCreator(e.key));
		}
	};
	const onLogout = () => {
		dispatch(userSlice.actions.logOut());
		navigate("/");
	};
	return (
		<div className={styles["app-header"]}>
			{/* top-header */}
			<div className={styles["top-header"]}>
				<div className={styles.inner}>
					<Typography.Text>让旅游更幸福</Typography.Text>
					<Dropdown.Button
						style={{ marginLeft: 15 }}
						overlay={
							<Menu
								onClick={menuClickHandler}
								items={[
									...languageList.map((l) => {
										return { key: l.code, label: l.name };
									}),
									// { key: "new", label: t("header.add_new_language") },
								]}
							/>
						}
						icon={<GlobalOutlined />}
					>
						{language === "zh" ? "中文" : language === "jp" ? "日本語" : "English"}
					</Dropdown.Button>
					{jwt ? (
						<Button.Group className={styles["button-group"]}>
							<span>
								{t("header.welcome")}
								<Typography.Text strong>{username}</Typography.Text>
							</span>
							<Button loading={shoppingCartLoading} onClick={() => navigate("/shoppingCart")}>
								{t("header.shoppingCart")}({shoppingCartItems.length})
							</Button>
							<Button onClick={onLogout}>{t("header.signOut")}</Button>
						</Button.Group>
					) : (
						<Button.Group className={styles["button-group"]}>
							<Button onClick={() => navigate("/register")}>{t("header.register")}</Button>
							<Button onClick={() => navigate("/signIn")}>{t("header.signin")}</Button>
						</Button.Group>
					)}
				</div>
			</div>
			<Layout.Header className={styles["main-header"]}>
				<span onClick={() => navigate("/")}>
					<img src={logo} alt="logo" className={styles["App-logo"]} />
					<Typography.Title level={3} className={styles.title}>
						{t("header.title")}
					</Typography.Title>
				</span>
				<Input.Search
					placeholder={"请输入旅游目的地、主题、或关键字"}
					className={styles["search-input"]}
					defaultValue={searchKeyword} // 设置搜索框的默认值为提取的关键字
					onSearch={(keyword) => navigate("/search/" + keyword)}
				/>
			</Layout.Header>
			{/* 使用<Menu>组件创建一个水平的主菜单，其中styles["main-menu"]用于定义菜单的样式。
			items数组中的每个对象都代表一个菜单项，其'key'是唯一标识符，'label'是菜单项的显示文本。显示文本使用i18n的t函数进行国际化。 */}
			<Menu
				mode={"horizontal"}
				className={styles["main-menu"]}
				items={[
					{ key: "1", label: t("header.home_page") },
					{ key: "2", label: t("header.weekend") },
					{ key: "3", label: t("header.group") },
					{ key: "4", label: t("header.backpack") },
					{ key: "5", label: t("header.private") },
					{ key: "6", label: t("header.cruise") },
					{ key: "7", label: t("header.hotel") },
					{ key: "8", label: t("header.local") },
					{ key: "9", label: t("header.theme") },
					{ key: "10", label: t("header.custom") },
					{ key: "11", label: t("header.study") },
					{ key: "12", label: t("header.visa") },
					{ key: "13", label: t("header.enterprise") },
					{ key: "14", label: t("header.high_end") },
					{ key: "15", label: t("header.outdoor") },
					{ key: "16", label: t("header.insurance") },
				]}
			/>
		</div>
	);
};
