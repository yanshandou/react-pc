/* 这是一个使用Redux和Redux Toolkit管理状态，并且集成了Redux Persist进行数据持久化的应用程序的配置文件 */
// 引入redux中的createStore（创建仓库）函数和applyMiddleware（应用中间件）函数
import { createStore, applyMiddleware } from "redux";
// 分别引入语言相关和推荐商品相关的reducer
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
// 引入thunk中间件，用于处理异步操作
import thunk from "redux-thunk";
// 引入自定义的日志记录中间件
import { actionLog } from "./middlewares/actionLog";
// 分别引入产品详情、产品搜索、用户信息、购物车、订单等slice，里面包含了各自的reducer和actions
// 导入 productDetail 模块的 slice，slice 是 redux 中用于管理状态的一种模式
import { productDetailSlice } from "./productDetail/slice";
// 从 @reduxjs/toolkit 包中导入 combineReducers 和 configureStore，combineReducers 用于合并多个 reducer，configureStore 是创建 store 的工具
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// 导入 productSearch 模块的 slice
import { productSearchSlice } from "./productSearch/slice";
// 导入用户模块的 slice
import { userSlice } from "./user/slice";
// 导入 redux-persist 库中的 persistStore 和 persistReducer，用于本地持久化存储 state
import { persistStore, persistReducer } from "redux-persist";
// 导入 redux-persist 库提供的默认存储方式（localStorage）
import storage from "redux-persist/lib/storage";
// 导入购物车模块的 slice
import { shoppingCartSlice } from "./shoppingCart/slice";
// 导入订单模块的 slice
import { orderSlice } from "./order/slice";
// 设置redux-persist配置信息，包括存储的key值，存储方式以及需要进行持久化的部分
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"],
};
// 使用combineReducers整合所有的reducers
// combineReducers 是用于把多个 reducer 合并成一个根 reducer 的函数
/* 这段代码是创建一个 rootReducer，这是 Redux 应用中的主 reducer。这个 reducer 会处理所有派发到 store 的 action，并更新相应的 state。在这里，我们使用 combineReducers 函数将多个单独的 reducer 合并成一个 "根" reducer。每个传递给 combineReducers 的 reducer 都负责管理 state 中的一部分数据 */
const rootReducer = combineReducers({
	// languageReducer 处理语言相关的操作
	language: languageReducer,
	// recommendProductsReducer 处理推荐产品相关的操作
	recommendProducts: recommendProductsReducer,
	// productDetailSlice.reducer 处理产品详情相关的操作
	productDetail: productDetailSlice.reducer,
	// productSearchSlice.reducer 处理产品搜索相关的操作
	productSearch: productSearchSlice.reducer,
	// userSlice.reducer 处理用户相关的操作
	user: userSlice.reducer,
	// shoppingCartSlice.reducer 处理购物车相关的操作
	shoppingCart: shoppingCartSlice.reducer,
	// orderSlice.reducer 处理订单相关的操作
	order: orderSlice.reducer,
});
// 使用persistReducer函数将整合后的reducer和redux-persist的配置信息一起传入，创建出可以进行数据持久化的reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// 原来的createStore方法被注释掉了，现在使用configureStore方法创建store，并且将持久化的reducer、中间件以及开发者工具等配置传入
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(actionLog),
	devTools: true,
});
// 创建persistor，用来启动和管理redux-persist过程
const persistor = persistStore(store);
// 定义全局state类型（RootState），使用store.getState的返回值作为类型
export type RootState = ReturnType<typeof store.getState>;
// 定义dispatch类型（AppDispatch），使用store.dispatch的类型
export type AppDispatch = typeof store.dispatch;
// 导出store和persistor
export default { store, persistor };
