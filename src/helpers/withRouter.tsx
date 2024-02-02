/* 这段代码使用 React Router 来创建一个高阶组件（HOC） withRouter 。 这个 HOC 接受一个组件作为参数，然后返回一个新的组件。在新的组件中，它使用 useNavigate hook 来获取 navigate 函数，并将其作为属性传递给原始组件。 navigate 是 React Router 的一个功能，它允许你通过编程方式导航到不同的页面。所以，任何通过 withRouter 高阶组件封装的组件都可以接收 navigate 作为属性，然后用它来进行路由跳转。
 */
// 引入“react-router-dom”库中的“useNavigate”和“NavigateFunction”。
import { useNavigate, NavigateFunction } from "react-router-dom";
// 定义接口"RouteComponentProps"，该接口包含一个navigate属性，其类型为NavigateFunction。
export interface RouteComponentProps {
	navigate: NavigateFunction;
}
// 定义函数withRouter，该函数接受一个组件作为参数(Component)。
export const withRouter = (Component) => {
	// 内部定义了一个Wrapper组件。
	const Wrapper = (props) => {
		// 使用"react-router-dom"库提供的钩子"useNavigate"来获取一个navigate函数。
		const navigate = useNavigate();
		// 返回一个新的组件，这个新组件将navigate函数以属性方式传递给原始组件，并通过扩展运算符将剩余的属性也传递给原始组件。
		return <Component navigate={navigate} {...props} />;
	};
	// 返回这个新的、已经包装过的Wrapper组件。
	return Wrapper;
};
