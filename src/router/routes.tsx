import type { Route } from 'bitquran/shared/types'
import { lazy } from 'react'

const routes: Route[] = [
    {
        name: 'App',
        type: 'group',
        children: [
            {
                name: 'Beranda',
                path: '/',
                type: 'page',
                element: lazy(() => import('../pages/SurahList')),
                meta: { navbar: { order: 1 } }
            },
            {
                name: 'Surat',
                path: '/surat',
                type: 'redirect',
                meta: { redirection: '/' }
            },
            {
                name: 'Detail Surat',
                path: '/surat/:id',
                type: 'page',
                element: lazy(() => import('../pages/Surah'))
            },
            {
                name: 'Tafsir',
                path: '/surat/:id/tafsir/:tafsirId',
                type: 'page',
                element: lazy(() => import('../pages/Tafsir'))
            },
            {
                name: 'Tentang',
                path: '/tentang',
                type: 'page',
                element: lazy(() => import('../pages/About')),
                meta: { navbar: { order: 2 } }
            },
            {
                name: 'Riwayat Pembaruan',
                path: '/riwayat-pembaruan',
                type: 'page',
                element: lazy(() => import('../pages/ChangeLog')),
                meta: { navbar: { order: 3 } }
            },
            {
                name: '404',
                path: '*',
                type: 'page',
                element: lazy(() => import('../pages/NotFound'))
            }
        ]
    }
]

export default routes
