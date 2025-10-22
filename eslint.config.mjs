import { FlatCompat } from "@eslint/eslintrc"
import pluginPrettier from "eslint-plugin-prettier"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": [
        "error",
        {
          // ép tất cả về LF, xoá lỗi ␍
          endOfLine: "lf",

          // đồng bộ với .prettierrc của bạn
          semi: false,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "all",
          bracketSpacing: true,
          printWidth: 120,
          arrowParens: "avoid",
          useTabs: false,
        },
      ],
    },
  },
]

export default eslintConfig
