import { Input, Skeleton, SurahItem } from 'bitquran/components'
import { ILQuran } from 'bitquran/assets/images'
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
            <div className="rounded-[7px] sm:rounded-[10px] [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] mb-[20px] sm:mb-[30px]">
                <div
                    className="flex items-center h-[150px] sm:h-[250px] bg-no-repeat [background-position:bottom_-25px_right_-10px] sm:[background-position:bottom_-50px_right_-20px] [background-size:35%] sm:[background-size:30%]"
                    style={{ backgroundImage: `url(${ILQuran})` }}
                >
                    <div className="ml-[25px] sm:ml-[50px] box-border [&>*]:text-white">
                        <h1 className="text-[22px] leading-[29px] sm:text-[36px] sm:leading-[43px] font-semibold">
                            Daftar Surat dalam Al-Qur'an
                        </h1>
                        <p className="text-[14px] leading-[21px] sm:text-[20px] sm:leading-[27px]">
                            114 Surat &middot; Makkiyah &middot; Madaniyah
                        </p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <Input
                className="mb-[20px] sm:mb-[30px]"
                type="text"
                placeholder="Cari nama surat"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* List */}
            {isLoading ? (
                <div className="flex flex-col gap-[15px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} height={85} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-[15px]">
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
                        <p className="text-center text-[#999999] py-[30px]">
                            Surat tidak ditemukan
                        </p>
                    )}
                </div>
            )}
        </>
    )
}
