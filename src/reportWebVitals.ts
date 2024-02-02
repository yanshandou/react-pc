// 导入web-vitals库的ReportHandler类型
import { ReportHandler } from "web-vitals";

// 定义一个reportWebVitals函数，它可以接收一个可选的性能报告处理程序
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
	// 如果提供了处理程序，并且它是一个函数
	if (onPerfEntry && onPerfEntry instanceof Function) {
		// 异步导入web-vitals库
		import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			// 分别获取Cumulative Layout Shift、First Input Delay、
			// First Contentful Paint、Largest Contentful Paint和Time to First Byte的指标
			// 并将这些指标传递给我们的处理程序
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};

// 输出reportWebVitals函数
export default reportWebVitals;
