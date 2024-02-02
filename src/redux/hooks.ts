// 从 "react-redux" 导入 useSelector, TypedUseSelectorHook, useDispatch
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
// 从 "./store" 导入 RootState 和 AppDispatch
import { RootState, AppDispatch } from "./store";
// 使用类型的useSelector钩子以便在获取状态时获得类型提示，这样我们就不必每次都显式声明它
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// 创建一个特定于应用的 dispatch 钩子，可直接使用类型化的 dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
