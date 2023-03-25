module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names" : "off"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
