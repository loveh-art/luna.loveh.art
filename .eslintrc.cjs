// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:svelte/recommended",
    "plugin:svelte/prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ...
    project: "tsconfig.json",
    extraFileExtensions: [".svelte"], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    // ...
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // unused import
    "@typescript-eslint/no-unused-vars": 1,
    "prettier/prettier": 2, // Means error
  },
  env: {
    browser: true,
    node: true,
  },
};
