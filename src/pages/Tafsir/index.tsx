import { Select, Skeleton, VerseItem } from 'bitquran/components'
import { useAyah } from 'bitquran/services/queries'
import { Head } from 'bitquran/shared/lib'
import { Link, useNavigate, useParams } from 'react-router'

interface NavButtonProps {
    onClick: () => void
    disabled: boolean
    direction: 'prev' | 'next'
}

function NavButton({ onClick, disabled, direction }: NavButtonProps) {
    const isPrev = direction === 'prev'

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center w-8.75 h-8.75 rounded-[5px] transition duration-300 ${
                disabled
                    ? 'text-[#cccccc] bg-[#eaeaea] cursor-not-allowed'
                    : 'text-[#80cbc4] bg-[#e0f2f1] hover:bg-[#e0f2f1]/50 hover:cursor-pointer'
            }`}
            aria-label={isPrev ? 'Ayat sebelumnya' : 'Ayat berikutnya'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6.25 h-6.25"
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

            <div className="bg-white rounded-[7px] sm:rounded-[10px] shadow-[0_0_10px_rgba(234,234,234,0.8)] p-3.75">
                {/* Navigation Header */}
                <div className="flex items-center justify-between border-b border-[#dedede] pb-3.75 mb-3.75">
                    <NavButton
                        onClick={() => goTo(currentAyah - 1)}
                        disabled={!hasPrev}
                        direction="prev"
                    />

                    <div className="text-center">
                        <p className="text-[#757575] text-[16px] sm:text-[20px] font-normal leading-5.75 sm:leading-6.75">
                            Tafsir
                        </p>
                        <h3 className="text-[#757575] text-base sm:text-[20px] font-normal leading-5.75 sm:leading-6.75">
                            {surahName}
                        </h3>
                        <span className="text-[#757575] text-sm sm:text-base font-light leading-5.25 sm:leading-5.75">
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
                <div className="box-border m-auto mb-3.75 text-center">
                    <Select
                        id="tafsir-jump"
                        className="w-full sm:w-62.5! text-xs sm:text-sm leading-4.75 sm:leading-5.25"
                        onChange={handlePickTafsir}
                        value={tafsirId}
                    >
                        <Select.Option value="">-Lompat ke Tafsir Lain-</Select.Option>
                        {Array.from({ length: totalAyahs }).map((_, i) => (
                            <Select.Option key={i + 1} value={String(i + 1)}>
                                Tafsir {i + 1}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* Back link */}
                <Link
                    to={`/surat/${id}`}
                    className="inline-block text-[#80cbc4] text-xs sm:text-sm leading-4.75 sm:leading-5.25 mb-3.75 hover:opacity-75 hover:underline transition duration-300"
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
                />

                {/* Tafsir Text */}
                <div className="bg-[#f7f7f7] rounded-[5px] sm:rounded-[7px] p-3.75 sm:p-3.75 text-[#757575] text-sm sm:text-base leading-6 sm:leading-6.5 mb-3.75">
                    {verse.tafsir.id.long}
                </div>
            </div>
        </>
    )
}
