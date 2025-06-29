import type { RouteObject } from 'react-router-dom'
import type { Route } from 'bitquran/shared/types'
import GetElement from '../GetElement'

/**
 * Maps custom Route definitions to react-router-dom RouteObject format.
 * Handles index routes, group routes with children, and normal page or redirect routes.
 */
const routeMapper = (routes: Route[]): RouteObject[] =>
{
    return routes.map((route): RouteObject =>
    {
        const element = <GetElement route={route} />

        // Handle index route
        if(route.index) {
            return {
                index: true,
                element
            }
        }

        /** 
         * Handle group route with nested children
         * Only GroupRoute types have 'children' property
         */
        if(route.type === 'group' && route.children?.length) {
            return {
                path: route.path,
                element,
                children: routeMapper(route.children) // Recursively map nested children
            }
        }

        // Fallback for page or redirect routes without children
        return {
            path: route.path,
            element
        }
    })
}

export default routeMapper