// 导入React库
import React from "react";
// 导入测试工具库中的render和screen函数
/* render 和 screen 是来自于 React 测试库 '@testing-library/react' 的两个主要工具。 render : 此函数用于在测试环境中渲染指定的 React 组件。它将组件渲染为虚拟 DOM，以便您可以对其进行查询和断言。在给出的代码示例中， render(<App />); 这行代码正在将 App 组件渲染到虚拟 DOM 中。 screen : 测试库提供的一个集结了多种查询方法的对象，这些查询方法可以用来选择和断言已经渲染在屏幕上的元素。例如，在给出的代码样例中， const linkElement = screen.getByText(/learn react/i); 这行代码正在使用 screen 的 getByText 方法去选取页面上显示文本为 "learn react" 的元素。 */
import { render, screen } from "@testing-library/react";
// 导入要进行测试的App组件
import App from "./App";
// 定义一个测试用例，名称为'renders learn react link'
test("renders learn react link", () => {
	// 使用render函数渲染App组件
	render(<App />);
	// 使用screen.getByText方法查询页面上的元素，这里是查询包含'learn react'文本的元素
	const linkElement = screen.getByText(/learn react/i);
	// expect函数用于断言，这里断言linkElement应该在文档中，即渲染的App组件应该包含'learn react'文本
	expect(linkElement).toBeInTheDocument();
});
