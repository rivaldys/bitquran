import type { Route } from 'bitquran/shared/types'
import type { RouteObject } from 'react-router'
import GetElement from '../GetElement'

const routeMapper = (routes: Route[]): RouteObject[] => {
    return routes.map((route): RouteObject => {
        const element = <GetElement route={route} />

        if (route.index) return { index: true, element }

        if (route.type === 'group' && route.children?.length) {
            return {
                path: route.path,
                element,
                children: routeMapper(route.children)
            }
        }

        return { path: route.path, element }
    })
}

export default routeMapper
