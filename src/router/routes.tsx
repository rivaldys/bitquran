/**
 * @fileoverview
 * Application routes configuration for React Router.
 * 
 * Each route must conform to the `Route` type imported from shared/types.
 * Routes can be of type:
 *  - 'page': a normal page route with an element component.
 *  - 'group': a route grouping child routes (no element, but may wrap children).
 *  - 'redirect': a route that automatically redirects to another path.
 * 
 * @example
 * // Simple page route:
 * {
 *     name: 'Login',
 *     path: '/login',
 *     type: 'page',
 *     element: LoginComponent,
 *     meta: {
 *         isProtectedRoute: false,
 *         navbarIcon: 'login-icon'
 *     }
 * }
 * 
 * @example
 * // Group route with children:
 * {
 *     name: 'Panel',
 *     path: '/panel',
 *     type: 'group',
 *     meta: {
 *         isProtectedRoute: true
 *     },
 *     children: [
 *         // child routes here
 *     ]
 * }
 * 
 * @example
 * // Redirect route:
 * {
 *     name: 'Main',
 *     path: '/',
 *     type: 'redirect',
 *     meta: {
 *         redirection: '/auth/login'
 *     }
 * }
 * 
 * @typedef {import('bitquran/shared/types').Route} Route
 */
import type { Route } from 'bitquran/shared/types'
import { lazy } from 'react'

const About = lazy(() => import('../pages/About'))
const ChangeLog = lazy(() => import('../pages/ChangeLog'))
const Surah = lazy(() => import('../pages/Surah'))
const NotFound = lazy(() => import('../pages/NotFound'))

/**
 * List of application routes
 * 
 * @type {Route[]}
 */
const routes: Route[] = [
    {
        name: 'Beranda',
        path: '/',
        type: 'page',
        element: Surah,
        meta: {
            navbar: {
                order: 1
            }
        }
    },
    {
        name: 'Surah',
        path: '/surah',
        type: 'page',
        element: Surah,
        meta: {}
    },
    {
        name: 'Tentang',
        path: '/tentang',
        type: 'page',
        element: About,
        meta: {
            navbar: {
                order: 2
            }
        }
    },
    {
        name: 'Riwayat Pembaruan',
        path: '/riwayat-pembaruan',
        type: 'page',
        element: ChangeLog,
        meta: {
            navbar: {
                order: 3
            }
        }
    },
    {
        name: '404',
        path: '*',
        type: 'page',
        element: NotFound,
        meta: {
            isProtectedRoute: false
        }
    }
]

export default routes