import { createBrowserRouter, RouterProvider } from 'react-router'
import { resolveBaseName, routeMapper } from './core'
import routes from './routes'

const configuredBaseName = import.meta.env.VITE_APP_BASE_NAME || '/'
const basename = resolveBaseName(window.location.pathname, configuredBaseName)
const router = createBrowserRouter(routeMapper(routes), { basename })

const normalizeRootUrl = () => {
    if (basename === '/' || window.location.pathname !== `${basename}/`) return

    window.history.replaceState(
        window.history.state,
        '',
        `${basename}${window.location.search}${window.location.hash}`
    )
}

normalizeRootUrl()
router.subscribe(normalizeRootUrl)

export { routes }
export default function Router() {
    return <RouterProvider router={router} />
}
