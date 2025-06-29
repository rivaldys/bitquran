import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routeMapper } from './core'
import routes from './routes'

const router = createBrowserRouter(routeMapper(routes))

export { routes }
export default function Router()
{
    return <RouterProvider router={router} />
}