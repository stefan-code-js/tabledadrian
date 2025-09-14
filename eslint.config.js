import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { ecmaVersion: "latest", sourceType: "module", project: false } },
    rules: {}
  }
];
