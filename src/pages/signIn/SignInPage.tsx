// 导入相关的库与组件
import React from "react";
import { UserLayout } from "../../layouts/userLayout"; // 用户布局组件
import { SignInForm } from "./SignInForm"; // 登录表单组件

// 定义SignInPage组件，没有传入任何props
export const SignInPage: React.FC = (props) => {
	// 在UserLayout中渲染登录表单组件
	return (
		<UserLayout>
			<SignInForm />
		</UserLayout>
	);
};
