/**
 * 这是一个Redux中间件，用于打印触发的action以及action之前和之后的state
 */
// 从"redux"库中导入Middleware类型
import { Middleware } from "redux";
// 定义名为actionLog的Redux中间件
// 这是一个使用箭头函数的柯里化 (Currying) 用法。
// 在 Redux 中，中间件（Middleware）有一个特定的格式。它需要接受三个参数：
// store ， next ，和 action 。但是，这些参数不是一次性全部接收的，而是分步接收的，每一步返回一个新的函数，等待接收下一个参数。这就是柯里化。
// store : 这是 Redux store，包含有全局 state，你可以通过 
// store.getState() 获取当前状态。
// next : 这是一个函数，负责将 action 传递给下一个中间件或者 reducer。如果你想要停止 action 传递，只需要不调用这个函数。
// action : 这是被 dispatch 的 action 对象。
export const actionLog: Middleware = (store) => (next) => (action) => {
	// 打印当前状态
	// console.log("state 当前", store.getState());
	// 打印被触发的action
	// console.log("fire action ", action);
	// 把action传递给下一个中间件，如果没有其他中间件则直接触发reducer
	next(action);
	// 打印更新后的状态
	// console.log("state 更新", store.getState());
};
