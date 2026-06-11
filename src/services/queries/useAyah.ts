import { useQuery } from '@tanstack/react-query'
import api from 'bitquran/services/api'
import type { VerseItem } from 'bitquran/shared/types'

interface ApiResponse<T> {
    code: number
    data: T
    message: string
    status: string
}

const fetchAyah = async (surahId: string, ayahId: string): Promise<VerseItem> => {
    const { data } = await api.get<ApiResponse<VerseItem>>(`/surah/${surahId}/${ayahId}`)
    return data.data
}

export const useAyah = (surahId: string, ayahId: string) => {
    return useQuery({
        queryKey: ['ayah', surahId, ayahId],
        queryFn: () => fetchAyah(surahId, ayahId),
        enabled: !!surahId && !!ayahId
    })
}
