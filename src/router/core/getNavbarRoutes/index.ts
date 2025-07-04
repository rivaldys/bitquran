import type { Route } from 'bitquran/shared/types'

/**
 * Recursively collect all routes that define `meta.navbar`.
 *
 * @param routes The array of Route objects to scan.
 * @returns An array of routes that include `meta.navbar`.
 */
const getNavbarRoutes = (routes: Route[]): Route[] =>
{
    const result: Route[] = []

    for(const route of routes)
    {
        // If the route has a navbar, include it
        if(route.meta?.navbar)
        {
            result.push(route)
        }

        // If the route has children, check recursively
        if(route.type === 'group' && route.children)
        {
            result.push(...getNavbarRoutes(route.children))
        }
    }

    // Sort routes by the 'order' value defined in meta.
    // Routes without an 'order' value default to 0, placing them earlier in the list.
    // This ensures consistent ordering for navigation elements like sidebars.
    return result.sort((a, b) => (a.meta?.navbar?.order ?? 0) - (b.meta?.navbar?.order ?? 0))
}

export default getNavbarRoutes