import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
	{
		ignores: ["**/dist/**", "**/node_modules/**"]
	},
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		plugins: {
			"@typescript-eslint": tseslint,
			prettier
		},
		rules: {
			...tseslint.configs.recommended.rules,
			"prettier/prettier": "error"
		}
	},
	prettierConfig
];
