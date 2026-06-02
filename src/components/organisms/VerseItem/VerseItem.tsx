import { Toolbar } from 'bitquran/components'
import { useAudioPlayer } from 'bitquran/shared/hooks'
import { cva } from 'class-variance-authority'

export interface VerseItemProps {
    className?: string
    toolbar?: {
        number?: string | number
        audioSrc?: string
        onTafsir?: () => void
    }
    verse: {
        ar: string
        id: string
    }
    disableBottomSeparator?: boolean
}

const containerStyle = cva('relative w-full transition duration-500 box-border')

export default function VerseItem({ className, verse, disableBottomSeparator, toolbar }: VerseItemProps) {
    const { isPlaying, toggle } = useAudioPlayer(toolbar?.audioSrc ?? '')

    return (
        <div className={containerStyle({ className: disableBottomSeparator ? className : `border-b border-b-[#dedede] mb-8.75 ${className ?? ''}` })}>
            {toolbar && (
                <Toolbar
                    className="mb-2.5"
                    number={toolbar.number}
                    audioButton={toolbar.audioSrc ? { isPlaying, onToggle: toggle } : undefined}
                    docButton={toolbar.onTafsir ? { onClick: toolbar.onTafsir } : undefined}
                />
            )}

            {verse.ar && (
                <p className="w-full text-[#757575] text-[30px] leading-12.5 font-saleem-quran font-normal text-right">
                    {verse.ar}
                </p>
            )}
            {verse.id && (
                <p className="w-full text-[#757575] italic py-3.75 text-sm sm:text-base">
                    {verse.id}
                </p>
            )}
        </div>
    )
}
