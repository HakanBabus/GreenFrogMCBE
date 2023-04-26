/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const { existsSync } = require("fs");
const path = require("path");
const LanguageException = require("./exceptions/LanguageException");

/**
 * @typedef {Object.<string, string>} LanguageContent
 */

/**
 * Returns the content of a language file.
 *
 *
 * @param {string} lang - The language code.
 * @returns {LanguageContent} The content of the language file.
 * @throws {LanguageException} If the language file is not found or is not valid JSON.
 */
function getLanguage(lang) {
	const langPath = path.resolve(__dirname, "../lang");
	const langFile = path.join(langPath, `${lang}.json`);

	if (!existsSync(langFile)) {
		throw new LanguageException("Failed to find that language");
	}

	const langContent = require(langFile);

	if (typeof langContent !== "object") {
		throw new LanguageException("Language file is not valid JSON");
	}

	return langContent;
}

/**
 * Returns a specific key from the current language file.
 *
 * @param {string} key - The key to retrieve.
 * @returns {string} The value associated with the key.
 */
function getKey(key) {
	const langConfig = require("../Frog").serverConfigurationFiles.config.chat.lang;
	return getLanguage(langConfig)[key];
}

module.exports = {
	getLanguage,
	getKey,
};