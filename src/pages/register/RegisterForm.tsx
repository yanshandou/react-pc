// 导入 Form, Input, Button 和 Checkbox 组件从 'antd' 库
import { Form, Input, Button, Checkbox } from "antd";
// 导入样式文件
import styles from "./RegisterForm.module.css";
// 从 'axios' 库导入 axios，用于进行 HTTP 请求
import axios from "axios";
// 导入 useNavigate hook 从 'react-router-dom'，用于管理路由跳转
import { useNavigate } from "react-router-dom";
// 定义布局配置，labelCol 和 wrapperCol 是 antd Form 组件的布局属性，span 表示占用列数
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
// 定义尾部布局配置，offset 表示偏移量，span 表示占用列数
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
export const RegisterForm = () => {
	const navigate = useNavigate();
	const onFinish = async (values: any) => {
		// console.log("Success:", values);
		try {
			await axios.post("http://82.157.43.234:8080/auth/register", {
				email: values.username,
				password: values.password,
				confirmPassword: values.confirm,
			});
			navigate("/signIn/");
		} catch (error) {
			alert("注册失败！");
		}
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
			<Form.Item
				label="确认密码"
				name="confirm"
				hasFeedback
				rules={[
					{ required: true, message: "请输入您的确认密码！" },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("密码确认不一致！");
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...tailLayout} name="remember" valuePropName="checked">
				<Checkbox>记住我</Checkbox>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					注册
				</Button>
			</Form.Item>
		</Form>
	);
};
