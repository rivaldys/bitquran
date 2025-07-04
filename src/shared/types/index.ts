import type { IconName } from 'bitquran/components'
import type { ComponentType, LazyExoticComponent } from 'react'
import { useNavigate } from 'react-router-dom'

export interface RouteComponentProps {
    navigate: ReturnType<typeof useNavigate>
}

export type RouteComponent = LazyExoticComponent<ComponentType<{}>>

export type RouteType = 'page' | 'group' | 'redirect'

interface MetaNavbar {
    icon?: IconName
    order?: number
}

interface BaseRoute {
    name: string
    path?: string
    index?: true
    meta?: {
        isProtectedRoute?: boolean
        navbar?: MetaNavbar
        navbarIcon?: IconName
        order?: number
        redirection?: string
    }
}

export interface IndexRoute extends BaseRoute {
    index: true
    type: 'page'
    element: RouteComponent
}

export interface IndexRedirectRoute extends BaseRoute {
    index: true
    type: 'redirect'
}

export interface PageRoute extends BaseRoute {
    type: 'page'
    path: string
    element: RouteComponent
}

export interface GroupRoute extends BaseRoute {
    type: 'group'
    children: Route[]
}

export interface RedirectRoute extends BaseRoute {
    type: 'redirect'
    path: string
}

export type Route = IndexRoute | IndexRedirectRoute | PageRoute | GroupRoute | RedirectRoute

export interface IconProps {
    className?: string
    name?: IconName
    size?: number
    color?: string
    variant?: string
}

export interface CredentialsPayload {
    username: string
    password: string
}

export interface SurahsProps {
    surahs: {
        code: number
        data: SurahItem[]
        message: string
        status: string
    }
}

export interface SurahProps {
    surah: {
        code: number
        data: SurahItem
        message: string
        status: string
    }
}

export interface SurahTafsirProps {
    verse: {
        code: number
        data: VerseItem
        message: string
        status: string
    }
}

export interface SurahItem {
    name: {
        long: string
        short: string
        translation: {
            en: string
            id: string
        }
        transliteration: {
            en: string
            id: string
        }
    }
    number: number
    numberOfVerses: number
    revelation: {
        arab: string
        en: string
        id: string
    }
    sequence: number
    tafsir: {
        id: string
    },
    verses?: VerseItem[]
}

export interface VerseItem {
    audio: {
        primary: string,
        secondary: string[]
    },
    meta: {
        hizbQuarter: number,
        juz: number,
        manzil: number,
        page: number,
        ruku: number,
        sajda: {
            obligatory: boolean,
            recommended: boolean
        }
    },
    number: {
        inQuran: number,
        inSurah: number
    },
    surah?: SurahItem,
    tafsir: {
        id: {
            long: string,
            short: string
        }
    },
    text: {
        arab: string,
        transliteration: {
            en: string
        }
    },
    translation: {
        en: string,
        id: string
    }
}
