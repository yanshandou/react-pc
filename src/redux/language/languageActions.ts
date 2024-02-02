export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
	type: typeof CHANGE_LANGUAGE;
	payload: "zh" | "en" | "jp";
}

interface AddLanguageAction {
	type: typeof ADD_LANGUAGE;
	payload: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

// 动作创建器，用于更改应用的当前语言。
export const changeLanguageActionCreator = (languageCode: "zh" | "en" | "jp"): ChangeLanguageAction => {
		// 返回一个动作对象，包含要进行的操作类型和负载数据。
		return {
				// 操作类型：更改语言。
				type: CHANGE_LANGUAGE,
				// 负载：新的语言编码。
				payload: languageCode,
		};
};

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
	return {
		type: ADD_LANGUAGE,
		payload: { name, code },
	};
};
