import { Select, Skeleton, VerseItem } from 'bitquran/components'
import { useAyah } from 'bitquran/services/queries'
import { Head } from 'bitquran/shared/lib'
import { Link, useNavigate, useParams } from 'react-router'

function NavButton({
    onClick,
    disabled,
    direction
}: {
    onClick: () => void
    disabled: boolean
    direction: 'prev' | 'next'
}) {
    const isPrev = direction === 'prev'
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                disabled
                    ? 'text-[#cccccc] cursor-not-allowed'
                    : 'text-[#757575] hover:bg-[#e0f2f1] hover:text-[#4CAF50]'
            }`}
            aria-label={isPrev ? 'Ayat sebelumnya' : 'Ayat berikutnya'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 512 512"
                stroke="currentColor"
            >
                {isPrev ? (
                    <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M328 112L184 256l144 144"
                    />
                ) : (
                    <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M184 112l144 144-144 144"
                    />
                )}
            </svg>
        </button>
    )
}

export default function Tafsir() {
    const { id = '', tafsirId = '' } = useParams<{ id: string; tafsirId: string }>()
    const navigate = useNavigate()
    const { data: verse, isLoading } = useAyah(id, tafsirId)

    const currentAyah = parseInt(tafsirId, 10)
    const totalAyahs = verse?.surah?.numberOfVerses ?? 0
    const hasPrev = currentAyah > 1
    const hasNext = currentAyah < totalAyahs

    const goTo = (ayahNum: number) => navigate(`/surat/${id}/tafsir/${ayahNum}`)

    const handlePickTafsir = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        if (val) goTo(parseInt(val, 10))
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-3.75">
                <Skeleton height={60} />
                <Skeleton height={200} />
                <Skeleton height={150} />
            </div>
        )
    }

    if (!verse) return null

    const surahName = verse.surah?.name.transliteration.id ?? ''

    return (
        <>
            <Head>
                <title>
                    Tafsir {surahName} Ayat {verse.number.inSurah} — Bitquran
                </title>
            </Head>

            <div className="bg-white rounded-[7px] sm:rounded-[10px] shadow-[0_0_10px_rgba(234,234,234,0.8)] p-[15px] sm:p-[20px]">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-[15px]">
                    <NavButton
                        onClick={() => goTo(currentAyah - 1)}
                        disabled={!hasPrev}
                        direction="prev"
                    />

                    <div className="text-center">
                        <p className="text-[#999999] text-xs leading-[19px]">Tafsir</p>
                        <h3 className="text-[#757575] text-base sm:text-[20px] font-normal leading-[23px] sm:leading-[27px]">
                            {surahName}
                        </h3>
                        <span className="text-[#999999] text-sm leading-[21px]">
                            Ayat {verse.number.inSurah}
                        </span>
                    </div>

                    <NavButton
                        onClick={() => goTo(currentAyah + 1)}
                        disabled={!hasNext}
                        direction="next"
                    />
                </div>

                {/* Jump to Tafsir */}
                <Select className="mb-[15px]" onChange={handlePickTafsir} value="">
                    <Select.Option value="">-Lompat ke Tafsir Lain-</Select.Option>
                    {Array.from({ length: totalAyahs }).map((_, i) => (
                        <Select.Option key={i + 1} value={String(i + 1)}>
                            Tafsir {i + 1}
                        </Select.Option>
                    ))}
                </Select>

                {/* Back link */}
                <Link
                    to={`/surat/${id}`}
                    className="inline-block text-[#4CAF50] text-xs sm:text-sm leading-[19px] sm:leading-[21px] mb-[20px] hover:opacity-75 transition"
                >
                    &larr; Kembali ke Surat
                </Link>

                {/* Verse */}
                <VerseItem
                    toolbar={{
                        number: verse.number.inSurah,
                        audioSrc: verse.audio.primary
                    }}
                    verse={{ ar: verse.text.arab, id: verse.translation.id }}
                    disableBottomSeparator
                />

                {/* Tafsir Text */}
                <div className="mt-[20px] bg-[#fafafa] rounded-[5px] sm:rounded-[7px] p-[15px] sm:p-[20px] text-[#757575] text-sm sm:text-base leading-[24px] sm:leading-[28px]">
                    {verse.tafsir.id.long}
                </div>
            </div>
        </>
    )
}
