import type { Route } from 'bitquran/shared/types'

const getNavbarRoutes = (routes: Route[]): Route[] => {
    const result: Route[] = []

    for (const route of routes) {
        if (route.meta?.navbar) result.push(route)
        if (route.type === 'group' && route.children) {
            result.push(...getNavbarRoutes(route.children))
        }
    }

    return result.sort((a, b) => (a.meta?.navbar?.order ?? 0) - (b.meta?.navbar?.order ?? 0))
}

export default getNavbarRoutes
