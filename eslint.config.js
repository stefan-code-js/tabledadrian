import js from "@eslint/js";
export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: { parserOptions: { ecmaVersion: "latest", sourceType: "module" } },
    rules: {}
  }
];
