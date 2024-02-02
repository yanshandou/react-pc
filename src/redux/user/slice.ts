import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义用户状态接口
interface UserState {
	loading: boolean; // 表示是否正在加载
	error: string | null; // 错误信息
	token: string | null; // 用户token
}

// 初始化用户状态
const initialState: UserState = {
	loading: false,
	error: null,
	token: null,
};

// 异步 thunk action，用于处理登录请求
export const signIn = createAsyncThunk(
	"user/signIn",
	async (
		paramaters: {
			email: string;
			password: string;
		},
		thunkAPI
	) => {
		const { data } = await axios.post(`http://82.157.43.234:8080/auth/login`, {
			email: paramaters.email, // 用户邮箱
			password: paramaters.password, // 用户密码
		});
		return data.token; // 返回获取到的token
	}
);

// 创建用户相关的 slice
export const userSlice = createSlice({
	name: "user", // slice的名称
	initialState, // 初始状态
	reducers: {
		// 定义一个用于处理退出登录的reducer
		logOut: (state) => {
			state.token = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: {
		// 根据signIn action的状态，定义相应的reducers
		[signIn.pending.type]: (state) => {
			state.loading = true; // 请求开始时，设置loading为true
		},
		[signIn.fulfilled.type]: (state, action) => {
			state.token = action.payload; // 请求成功时，设置token
			state.loading = false; // 请求结束，设置loading为false
			state.error = null; // 清除错误信息
		},
		[signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
			state.loading = false; // 请求结束，设置loading为false
			state.error = action.payload; // 设置错误信息
		},
	},
});
