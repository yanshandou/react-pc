// 导入样式文件
import styles from "./SignInForm.module.css";
// 导入antd组件库中的一些UI组件
import { Form, Input, Button, Checkbox } from "antd";
// 导入redux相关的操作函数和hooks
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector, useAppDispatch } from "../../redux/hooks";
// 导入React的effects hook
import { useEffect } from "react";
// 用于导航的hook
import { useNavigate } from "react-router-dom";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {
	const loading = useSelector((s) => s.user.loading);
	const jwt = useSelector((s) => s.user.token);
	const error = useSelector((s) => s.user.error);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (jwt !== null) {
			navigate("/");
		}
	}, [jwt]);

	const onFinish = (values: any) => {
		// console.log("Success:", values);
		dispatch(
			signIn({
				email: values.username,
				password: values.password,
			})
		);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Form
			{...layout}
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			className={styles["register-form"]}
		>
			<Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入您的用户名！" }]}>
				<Input />
			</Form.Item>

			<Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入您的密码！" }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailLayout} name="remember" valuePropName="checked">
				<Checkbox>记住我</Checkbox>
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};
