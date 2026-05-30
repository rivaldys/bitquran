import type { Route } from 'bitquran/shared/types'
import { lazy } from 'react'

const SurahList = lazy(() => import('../pages/SurahList'))
const Surah = lazy(() => import('../pages/Surah'))
const Tafsir = lazy(() => import('../pages/Tafsir'))
const About = lazy(() => import('../pages/About'))
const ChangeLog = lazy(() => import('../pages/ChangeLog'))
const NotFound = lazy(() => import('../pages/NotFound'))

const routes: Route[] = [
    {
        name: 'Beranda',
        path: '/',
        type: 'page',
        element: SurahList,
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
        element: Surah
    },
    {
        name: 'Tafsir',
        path: '/surat/:id/tafsir/:tafsirId',
        type: 'page',
        element: Tafsir
    },
    {
        name: 'Tentang',
        path: '/tentang',
        type: 'page',
        element: About,
        meta: { navbar: { order: 2 } }
    },
    {
        name: 'Riwayat Pembaruan',
        path: '/riwayat-pembaruan',
        type: 'page',
        element: ChangeLog,
        meta: { navbar: { order: 3 } }
    },
    {
        name: '404',
        path: '*',
        type: 'page',
        element: NotFound
    }
]

export default routes
