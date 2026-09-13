import { createBrowserRouter, RouterProvider } from 'react-router'
import { routeMapper } from './core'
import routes from './routes'

const configuredBaseName = import.meta.env.VITE_APP_BASE_NAME || '/'
const basename =
    configuredBaseName === '/' ? '/' : `/${configuredBaseName.replace(/^\/+|\/+$/g, '')}`
const router = createBrowserRouter(routeMapper(routes), { basename })

export { routes }
export default function Router() {
    return <RouterProvider router={router} />
}
