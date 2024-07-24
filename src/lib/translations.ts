import i18n from 'sveltekit-i18n';
import lang from "../locales/+lang.json"

export const defaultLocale = "en";

const config = ({
	fallbackLocale:"en",
	translations: { // add your language here, and +lang.js it makes the language selector show the language in its native language (en->English)
		de: {lang},
		en: {lang},
		fi: {lang}
	},
	loaders: [
	    	{
			"locale":"de",
			"key":"common",
			loader: async() => (
				await import("../locales/de.json")
			).default,
	    	},
	    	{
			"locale":"en",
			"key":"common",
			loader: async() => (
				await import("../locales/en.json")
			).default,
	    	},
	    	{
			"locale":"fi",
			"key":"common",
			loader: async() => (
				await import("../locales/fi.json")
			).default
	    	}
	]
})

export function addArguements(translation:string, replaced:Object):string {
	console.log("translation: " + translation);
	for(const [key,value] of Object.entries(replaced)) {
		console.log(`Replacing ${key} with ${value}`)
		translation = translation.replace(key,value);
	}
	return translation;
}

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute,l } = new i18n(config);
loading.subscribe(($loading) => $loading && console.log('Loading translations...'));