import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface OrderState {
	loading: boolean;
	error: string | null;
	currentOrder: any;
}

// 定义一个名为'initialState'的常量，其类型为'OrderState'
const initialState: OrderState = {
	loading: false, // 这是一个布尔值表示加载状态，初始设置为false，意味着没有在加载任何内容
	error: null, // 这是一个用于跟踪错误的变量，如果出现错误，会将错误信息设定为这个变量，初始设定为null，表示暂无任何错误
	currentOrder: null, // 这是一个用于存储当前订单信息的变量，初始设定为null，表示暂无任何订单
};

export const placeOrder = createAsyncThunk(
	"order/placeOrder",
	async (parameters: { jwt: string; orderId: string }, thunkAPI) => {
		const { data } = await axios.post(`http://82.157.43.234:8080/api/orders/${parameters.orderId}/placeOrder`, null, {
			headers: {
				Authorization: `bearer ${parameters.jwt}`,
			},
		});
		return data;
	}
);

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: {
		[placeOrder.pending.type]: (state) => {
			state.loading = true;
		},
		[placeOrder.fulfilled.type]: (state, action) => {
			state.currentOrder = action.payload;
			state.loading = false;
			state.error = null;
		},
		[placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
			state.loading = false;
			state.error = action.payload;
		},
		[checkout.pending.type]: (state) => {
			state.loading = true;
		},
		[checkout.fulfilled.type]: (state, action) => {
			state.currentOrder = action.payload;
			state.loading = false;
			state.error = null;
		},
		[checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});
