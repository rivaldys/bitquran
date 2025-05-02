export interface Action {
    type: string
    payload: {
        data: object | Array<object>
        errors: boolean | object
        isLoading: boolean
    }
}

export interface InitialState {
    data: object | Array<object>,
    errors: boolean | object,
    isLoading: boolean
}

export interface ErrorState {
    [key: string]: any
}

export type ActionRequest = object | object[]

export interface ActionResponse {
    failed?: (params: any) => void
    succeed?: (params: object) => void
}

export interface IconProps {
    name?: string
    size?: number
    color?: string
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