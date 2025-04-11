import { defineConfig } from "eslint/config";
import { parser as tsParser } from "typescript-eslint"
import pluginVue from 'eslint-plugin-vue'
import vueParse from "vue-eslint-parser"

export default defineConfig([
  {
    name: 'o-eslint',
    rules: {
      // 'vue/comment-directive': 'error',
      'vue/attributes-order': "error",
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: "latest",
      parser: vueParse,
      parserOptions: {
        sourceType: "module",
        parser: {
          "ts": tsParser,
        }
      }
    },
    files: ['**/*.?([cm])[jt]s?(x)', "**/*.vue"],
    processor: pluginVue.processors[".vue"],
    plugins: {
      vue: pluginVue
    }
  }
])