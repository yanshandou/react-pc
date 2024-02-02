// 导入相关的action types和actions
import {
	FETCH_RECOMMEND_PRODUCTS_FAIL,
	FETCH_RECOMMEND_PRODUCTS_START,
	FETCH_RECOMMEND_PRODUCTS_SUCCESS,
	RecommendProductAction,
} from "./recommendProductsActions";

// 定义推荐产品的状态类型
// 定义推荐产品的状态接口
interface RecommendProductsState {
	productList: any[]; // 产品列表
	loading: boolean; // 加载状态：当正在获取数据时为 true，数据加载结束后为 false
	error: string | null; // 错误信息：如果在获取数据过程中发生错误，它将存储错误消息，否则为 null
}

// 设置初始状态
const defaultState: RecommendProductsState = {
	loading: true,
	error: null,
	productList: [],
};

// 定义reducer处理各种action
export default (state = defaultState, action: RecommendProductAction) => {
	switch (action.type) {
		case FETCH_RECOMMEND_PRODUCTS_START: // 开始加载推荐产品数据
			return { ...state, loading: true };
		case FETCH_RECOMMEND_PRODUCTS_SUCCESS: // 成功获取推荐产品数据
			return { ...state, loading: false, productList: action.payload };
		case FETCH_RECOMMEND_PRODUCTS_FAIL: // 获取推荐产品数据失败
			return { ...state, loading: false, error: action.payload };
		default: // 默认返回当前状态
			return state;
	}
};
