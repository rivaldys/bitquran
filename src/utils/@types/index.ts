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

export interface SurahProps {
    surahs: {
        code: number
        data: SurahItem[]
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
    }
}