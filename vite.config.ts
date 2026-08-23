import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { loadEnv, type ConfigEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default ({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())

    return defineConfig({
        plugins: [react(), tailwindcss()],
        resolve: {
            tsconfigPaths: true
        },
        server: {
            port: parseInt(env.VITE_APP_PORT) || 3000
        },
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: ['./vitest.setup.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html']
            }
        }
    })
}
