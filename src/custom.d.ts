// 声明一个模块，指定所有.css文件的类型。
// 当 TypeScript 遇到非 TypeScript 模块（如 CSS、图片或第三方 JavaScript 库）时，需要这种特殊处理。
// 这里我们配置了CSS模块的默认导出类型为一个对象，该对象的键值都是字符串。
declare module "*.css" {
	// 定义一个名为css的变量，它是一个索引签名对象。
	// 对象的键是字符串类型，对应的值也是字符串类型。
	// 在这个上下文中，该对象可能用于存储CSS类名和其对应的值。
	const css: { [key: string]: string };
	export default css;
}
