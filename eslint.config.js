import tsParser from '@typescript-eslint/parser'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
        languageOptions: {
            parser: tsParser,
            globals: globals.browser
        }
    },
    {
        files: ['src/router/**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': 'off'
        }
    }
])
