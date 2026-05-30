import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { loadEnv, type ConfigEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default ({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                'bitquran/assets': resolve(__dirname, 'src/assets'),
                'bitquran/icons': resolve(__dirname, 'src/assets/icons'),
                'bitquran/images': resolve(__dirname, 'src/assets/images'),
                'bitquran/components': resolve(__dirname, 'src/components'),
                'bitquran/pages': resolve(__dirname, 'src/pages'),
                'bitquran/router': resolve(__dirname, 'src/router'),
                'bitquran/router/core': resolve(__dirname, 'src/router/core'),
                'bitquran/services/api': resolve(__dirname, 'src/services/api'),
                'bitquran/services/queries': resolve(__dirname, 'src/services/queries'),
                'bitquran/shared': resolve(__dirname, 'src/shared'),
                'bitquran/shared/constants': resolve(__dirname, 'src/shared/constants'),
                'bitquran/shared/hooks': resolve(__dirname, 'src/shared/hooks'),
                'bitquran/shared/lib': resolve(__dirname, 'src/shared/lib'),
                'bitquran/shared/types': resolve(__dirname, 'src/shared/types'),
                'bitquran/shared/utils': resolve(__dirname, 'src/shared/utils'),
                'bitquran/package': resolve(__dirname, './package.json')
            }
        },
        server: {
            port: parseInt(env.VITE_APP_PORT) || 3000
        },
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: ['./src/test/setup.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html']
            }
        }
    })
}
