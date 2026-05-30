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
        <div className={containerStyle({ className: disableBottomSeparator ? className : `border-b-[1px] border-b-[#dedede] pb-[20px] mb-[20px] ${className ?? ''}` })}>
            {toolbar && (
                <Toolbar
                    className="mb-[10px]"
                    number={toolbar.number}
                    audioButton={toolbar.audioSrc ? { isPlaying, onToggle: toggle } : undefined}
                    docButton={toolbar.onTafsir ? { onClick: toolbar.onTafsir } : undefined}
                />
            )}

            {verse.ar && (
                <p className="w-full text-[#757575] text-[30px] leading-[50px] sm:text-[34px] sm:leading-[55px] font-saleem-quran font-normal text-right">
                    {verse.ar}
                </p>
            )}
            {verse.id && (
                <p className="w-full text-[#757575] italic py-[15px] text-sm sm:text-base">
                    {verse.id}
                </p>
            )}
        </div>
    )
}
