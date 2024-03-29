module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "single"],
    semi: [2, "always"],
  },
};
