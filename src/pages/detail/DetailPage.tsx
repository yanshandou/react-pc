// 导入React的hooks：useState和useEffect
import React, { useState, useEffect } from "react";
// 从react-router-dom导入useParams，用以获取当前路由参数
import { useParams } from "react-router-dom";
// 引入axios库，用于发送请求
import axios from "axios";
// 从antd库中引入需要的组件
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
// 引入样式文件
import styles from "./DetailPage.module.css";
// 引入自定义组件Header、Footer、ProductIntro、ProductComments
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
// 从antd库中引入DatePicker、Space、Button这些组件
import { DatePicker, Space, Button } from "antd";
// 引入模拟评论数据
import { commentMockData } from "./mockup";
// 引入redux相关操作和slice
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
// 导入布局组件MainLayout
import { MainLayout } from "../../layouts/mainLayout";
// 从@ant-design/icons中导入购物车图标
import { ShoppingCartOutlined } from "@ant-design/icons";
// 导入添加购物车项的action
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
const { RangePicker } = DatePicker;
type MatchParams = {
	touristRouteId: string;
};
export const DetailPage: React.FC = () => {
	// 使用 useParams 钩子函数获取 URL 参数，这里的参数是 touristRouteId
	const { touristRouteId } = useParams<MatchParams>();
	// 使用 useSelector 钩子函数从 Redux Store 中获取 productDetail 的相关数据
	const loading = useSelector((state) => state.productDetail.loading); // 是否正在加载
	const error = useSelector((state) => state.productDetail.error); // 错误信息
	const product = useSelector((state) => state.productDetail.data); // 产品详情数据
	const dispatch = useAppDispatch(); // 使用 useAppDispatch 钩子函数获取 Redux 的 dispatch 方法
	const jwt = useSelector((s) => s.user.token) as string; // 从 Redux Store 中获取用户的 JWT token
	const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading); // 是否正在对购物车进行操作
	useEffect(() => {
		if (touristRouteId) {
			dispatch(getProductDetail(touristRouteId));
		}
	}, []);
	if (loading) {
		return (
			<Spin
				size="large"
				style={{
					marginTop: 200,
					marginBottom: 200,
					marginLeft: "auto",
					marginRight: "auto",
					width: "100%",
				}}
			/>
		);
	}
	if (error) {
		return <div>网站出错：{error}</div>;
	}
	return (
		<MainLayout>
			{/* 产品简介 与 日期选择 */}
			<div className={styles["product-intro-container"]}>
				<Row>
					<Col span={13}>
						<ProductIntro
							title={product.title}
							shortDescription={product.description}
							price={product.originalPrice}
							coupons={product.coupons}
							points={product.points}
							discount={product.price}
							rating={product.rating}
							pictures={product.touristRoutePictures.map((p) => p.url)}
						/>
					</Col>
					<Col span={11}>
						<Button
							style={{ marginTop: 50, marginBottom: 30, display: "block" }}
							type="primary"
							danger
							// loading={shoppingCartLoading}
							onClick={() => {
								dispatch(addShoppingCartItem({ jwt, touristRouteId: product.id }));
							}}
						>
							<ShoppingCartOutlined />
							放入购物车
						</Button>
						<RangePicker open style={{ marginTop: 20 }} />
					</Col>
				</Row>
			</div>
			{/* 锚点菜单 */}
			<Anchor className={styles["product-detail-anchor"]}>
				<Menu mode="horizontal">
					<Menu.Item key="1">
						<Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Anchor.Link href="#fees" title="费用"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="5">
						<Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
					</Menu.Item>
				</Menu>
			</Anchor>
			{/* 产品特色 */}
			<div id="feature" className={styles["product-detail-container"]}>
				<Divider orientation={"center"}>
					<Typography.Title level={3}>产品特色</Typography.Title>
				</Divider>
				<div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
			</div>
			{/* 费用 */}
			<div id="fees" className={styles["product-detail-container"]}>
				<Divider orientation={"center"}>
					<Typography.Title level={3}>费用</Typography.Title>
				</Divider>
				<div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
			</div>
			{/* 预订须知 */}
			<div id="notes" className={styles["product-detail-container"]}>
				<Divider orientation={"center"}>
					<Typography.Title level={3}>预定须知</Typography.Title>
				</Divider>
				<div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
			</div>
			{/* 商品评价*/}
			<div id="comments" className={styles["product-detail-container"]}>
				<Divider orientation={"center"}>
					<Typography.Title level={3}>用户评价</Typography.Title>
				</Divider>
				<div style={{ margin: 40 }}>
					<ProductComments data={commentMockData} />
				</div>
			</div>
		</MainLayout>
	);
};
