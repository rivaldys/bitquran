import { ILQuran } from 'bitquran/assets/images'
import { Input, Skeleton, SurahItem } from 'bitquran/components'
import { useSurahList } from 'bitquran/services/queries'
import { Head } from 'bitquran/shared/lib'
import { useMemo, useState } from 'react'

export default function SurahList() {
    const { data: surahList, isLoading } = useSurahList()
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        if (!surahList) return []
        if (!search) return surahList
        const regex = new RegExp(search, 'i')
        return surahList.filter(surah => regex.test(surah.name.transliteration.id))
    }, [surahList, search])

    return (
        <>
            <Head>
                <title>Bitquran — Baca Al-Qur'an secara Daring</title>
            </Head>

            {/* Header */}
            <div className="rounded-[7px] sm:rounded-[10px] bg-[linear-gradient(150deg,#c5e1a5,#009688)] mb-5 sm:mb-7.5">
                <div
                    className="flex items-center h-37.5 sm:h-62.5 bg-no-repeat bg-position-[bottom_-25px_right_-10px] sm:bg-position-[bottom_-50px_right_-20px] bg-size-[35%] sm:bg-size-[30%]"
                    style={{ backgroundImage: `url(${ILQuran})` }}
                >
                    <div className="ml-6.25 sm:ml-12.5 box-border *:text-white">
                        <h1 className="text-[22px] leading-7.25 sm:text-[36px] sm:leading-10.75 font-semibold">
                            Daftar Surat dalam Al-Qur'an
                        </h1>
                        <p className="text-[14px] leading-5.25 sm:text-[20px] sm:leading-6.75">
                            114 Surat &middot; Makkiyah &middot; Madaniyah
                        </p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <Input
                className="mb-5 sm:mb-7.5"
                type="text"
                placeholder="Cari nama surat"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* List */}
            {isLoading ? (
                <div className="flex flex-col gap-3.75">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} height={85} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-3.75">
                    {filtered.map(surah => (
                        <SurahItem
                            key={surah.number}
                            number={surah.number}
                            title={surah.name.transliteration.id}
                            description={surah.name.translation.id}
                            label={surah.name.short}
                            href={`/surat/${surah.number}`}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-center text-[#999999] py-7.5">Surat tidak ditemukan</p>
                    )}
                </div>
            )}
        </>
    )
}
