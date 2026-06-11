import { ILQuran } from 'bitquran/assets/images'
import { Select, Skeleton, VerseItem } from 'bitquran/components'
import { useSurah } from 'bitquran/services/queries'
import { useAudioPlayer } from 'bitquran/shared/hooks'
import { Head } from 'bitquran/shared/lib'
import { useNavigate, useParams } from 'react-router'

function BismillahPlayer({ text, src }: { text: string; src: string }) {
    const { isPlaying, toggle } = useAudioPlayer(src)

    return (
        <div className="mt-5 sm:mt-8.75 mb-3.75 flex items-center gap-3.75">
            <button
                onClick={toggle}
                aria-label={isPlaying ? 'Jeda bismillah' : 'Putar bismillah'}
                className="w-7.5 h-7.5 sm:w-8.75 sm:h-8.75 flex items-center justify-center rounded-full mt-2 bg-white/85 hover:bg-white/70 hover:cursor-pointer transition"
            >
                {isPlaying ? (
                    <svg
                        className="h-3 sm:h-4 fill-[salmon]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" />
                    </svg>
                ) : (
                    <svg
                        className="h-3 sm:h-4 fill-[salmon]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                    </svg>
                )}
            </button>
            <p className="text-white text-[26px] sm:text-[42px] font-saleem-quran">{text}</p>
        </div>
    )
}

export default function Surah() {
    const { id = '' } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data: surah, isLoading } = useSurah(id)

    const handlePickVerse = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = e.target.value
        if (!target) return
        const el = document.getElementById(target)
        if (!el) return
        window.scrollTo({ top: el.offsetTop - 75 - 15, behavior: 'smooth' })
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-3.75">
                <Skeleton height={250} className="rounded-[10px]" />
                <Skeleton height={50} />
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} height={120} />
                ))}
            </div>
        )
    }

    if (!surah) return null

    return (
        <>
            <Head>
                <title>{surah.name.transliteration.id} — Bitquran</title>
            </Head>

            {/* Surah Header */}
            <div className="relative rounded-[7px] sm:rounded-[10px] bg-[linear-gradient(150deg,#c5e1a5,#009688)] mb-8.75 sm:mb-12.5 min-h-57.5 sm:min-h-75 shadow-[10px_25px_30px_rgba(117,117,117,0.45)]">
                <div
                    className="absolute inset-0 rounded-[7px] sm:rounded-[10px] bg-no-repeat bg-position-[bottom_-25px_right_25px] sm:bg-position-[bottom_-50px_right_50px] bg-size-[45%] sm:bg-size-[35%] opacity-35"
                    style={{ backgroundImage: `url(${ILQuran})` }}
                />

                {/* Text Content */}
                <div className="relative flex flex-col items-center justify-center w-full h-full min-h-57.5 sm:min-h-75 px-6.25 sm:px-3.75 py-3.75 box-border *:text-white text-center">
                    <p className="text-[26px] sm:text-[28px] font-normal font-saleem-quran mb-2.5 leading-8.25 sm:leading-8.75">
                        {surah.name.long}
                    </p>
                    <h1 className="text-[22px] sm:text-[28px] font-medium leading-7.25 sm:leading-8.75">
                        {surah.name.transliteration.id}
                    </h1>
                    <p className="text-[14px] sm:text-[18px] leading-5.25 sm:leading-6.25">
                        {surah.name.translation.id}
                    </p>
                    <hr className="border-0 h-px w-full mt-1.75 sm:mt-3.75 mb-1.75 sm:mb-3.75 bg-[linear-gradient(to_right,transparent,#fff,transparent)]" />
                    <h5 className="text-[14px] sm:text-[16px] font-light leading-5.25 sm:leading-5.75">
                        {surah.revelation.id} &middot; {surah.numberOfVerses} Ayat
                    </h5>

                    {surah.preBismillah && (
                        <BismillahPlayer
                            text={surah.preBismillah.text.arab}
                            src={surah.preBismillah.audio.primary}
                        />
                    )}
                </div>
            </div>

            {/* Jump to Verse */}
            <Select
                id="verse-select"
                className="text-sm sm:text-base leading-5.25 sm:leading-5.75 mb-5 sm:mb-7.5"
                onChange={handlePickVerse}
                defaultValue=""
            >
                <Select.Option value="">-Pilih Ayat-</Select.Option>
                {surah.verses?.map(verse => (
                    <Select.Option
                        key={verse.number.inSurah}
                        value={`${surah.number}-${verse.number.inSurah}`}
                    >
                        Ayat {verse.number.inSurah}
                    </Select.Option>
                ))}
            </Select>

            {/* Verses */}
            <div className="bg-white rounded-[7px] sm:rounded-[10px] shadow-[0_0_10px_rgba(234,234,234,0.8)] p-3.75 sm:p-3.75">
                {surah.verses?.map((verse, idx) => (
                    <div key={verse.number.inSurah} id={`${surah.number}-${verse.number.inSurah}`}>
                        <VerseItem
                            toolbar={{
                                number: verse.number.inSurah,
                                audioSrc: verse.audio.primary,
                                onTafsir: () =>
                                    navigate(
                                        `/surat/${surah.number}/tafsir/${verse.number.inSurah}`
                                    )
                            }}
                            verse={{ ar: verse.text.arab, id: verse.translation.id }}
                            disableBottomSeparator={idx === (surah.verses?.length ?? 0) - 1}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
