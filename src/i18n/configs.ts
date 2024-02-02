import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";
import translation_jp from "./jp.json";

const resources = {
	en: {
		translation: translation_en,
	},
	zh: {
		translation: translation_zh,
	},
	jp: {
		translation: translation_jp,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "zh",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;