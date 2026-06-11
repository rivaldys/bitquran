import { useQuery } from '@tanstack/react-query'
import api from 'bitquran/services/api'
import type { SurahItem } from 'bitquran/shared/types'

interface ApiResponse<T> {
    code: number
    data: T
    message: string
    status: string
}

const fetchSurah = async (id: string): Promise<SurahItem> => {
    const { data } = await api.get<ApiResponse<SurahItem>>(`/surah/${id}`)
    return data.data
}

export const useSurah = (id: string) => {
    return useQuery({
        queryKey: ['surah', id],
        queryFn: () => fetchSurah(id),
        enabled: !!id
    })
}
