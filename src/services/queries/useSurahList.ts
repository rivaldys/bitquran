import { useQuery } from '@tanstack/react-query'
import api from 'bitquran/services/api'
import type { SurahItem } from 'bitquran/shared/types'

interface ApiResponse<T> {
    code: number
    data: T
    message: string
    status: string
}

const fetchSurahList = async (): Promise<SurahItem[]> => {
    const { data } = await api.get<ApiResponse<SurahItem[]>>('/surah')
    return data.data
}

export const useSurahList = () => {
    return useQuery({
        queryKey: ['surahList'],
        queryFn: fetchSurahList
    })
}
