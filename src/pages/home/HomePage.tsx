// 引入React库和需要的组件
import React from "react";
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from "../../components";
import { Row, Col, Typography, Spin } from "antd";
// 引入所需图片资源
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
// 引入CSS样式
import styles from "./HomePage.module.css";
// 引入路由相关的函数与接口
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
// 引入国际化函数
import { withTranslation, WithTranslation } from "react-i18next";
// 引入axios用于http请求
import axios from "axios";
// 引入redux相关函数与状态
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
// 引入redux action创建函数
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
// 引入布局组件
import { MainLayout } from "../../layouts/mainLayout";
// 定义了mapStateToProps函数，将redux的状态映射到该组件的props上
// 这个函数返回当前state中recommendProducts的加载状态、错误和产品列表
const mapStateToProps = (state: RootState) => {
	return {
		loading: state.recommendProducts.loading, // 加载状态
		error: state.recommendProducts.error, // 错误信息
		productList: state.recommendProducts.productList, // 产品列表
	};
};
// 定义了mapDispatchToProps函数，将调度dispatch的函数映射到该组件的props上
// 这个函数返回一个调用giveMeDataActionCreator的函数，用于发出获取数据的动作
const mapDispatchToProps = (dispatch) => {
	return {
		giveMeData: () => {
			dispatch(giveMeDataActionCreator()); // 发起获取数据的action
		},
	};
};
type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class HomePageComponent extends React.Component<PropsType> {
	componentDidMount() {
		this.props.giveMeData();
	}
	render(): React.ReactNode {
		// console.log(this.props.navigate)
		const { t } = this.props;
		const { productList, loading, error } = this.props;
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
				<Row style={{ marginTop: 20 }}>
					<Col span={6}>
						<SideMenu />
					</Col>
					<Col span={18}>
						<Carousel />
					</Col>
				</Row>
				<ProductCollection
					title={
						<Typography.Title level={3} type="warning">
							{t("home_page.hot_recommended")}
						</Typography.Title>
					}
					sideImage={sideImage}
					products={productList[0].touristRoutes}
				/>
				<ProductCollection
					title={
						<Typography.Title level={3} type="danger">
							{t("home_page.new_arrival")}
						</Typography.Title>
					}
					sideImage={sideImage2}
					products={productList[1].touristRoutes}
				/>
				<ProductCollection
					title={
						<Typography.Title level={3} type="success">
							{t("home_page.domestic_travel")}
						</Typography.Title>
					}
					sideImage={sideImage3}
					products={productList[2].touristRoutes}
				/>
				<BusinessPartners />
			</MainLayout>
		);
	}
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));
