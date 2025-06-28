import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { type ConfigEnv, defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())
    
    return defineConfig({
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "bitquran/assets": "/src/assets",
                "bitquran/icons": "/src/assets/icons",
                "bitquran/images": "/src/assets/images",
                "bitquran/components": "/src/components",
                "bitquran/pages": "/src/pages",
                "bitquran/router": "/src/router",
                "bitquran/router/core": "/src/router/core",
                "bitquran/services/api": "/src/services/api",
                "bitquran/services/slices": "/src/services/slices",
                "bitquran/services/store": "/src/services/store",
                "bitquran/shared/constants": "/src/shared/constants",
                "bitquran/shared/hooks": "/src/shared/hooks",
                "bitquran/shared/lib": "/src/shared/lib",
                "bitquran/shared/types": "/src/shared/types",
                "bitquran/shared/utils": "/src/shared/utils",
                "bitquran/package": "./package.json"
            }
        },
        server: {
            port: parseInt(env.VITE_APP_PORT)
        }
    })
}
