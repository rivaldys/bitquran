import { Toolbar } from 'bitquran/components'
import { cva } from 'class-variance-authority'

export interface VerseItemProps {
    className?: string
    toolbar?: {
        number?: string | number
        audioButton?: {
            src: string
            onClick: React.MouseEventHandler<HTMLButtonElement>
            title?: string
        }
        docButton?: {
            onClick: React.MouseEventHandler<HTMLButtonElement>
            title?: string
        }
    }
    verse: {
        ar: string
        id: string
    }
    disableBottomSepartor?: boolean
}

const containerVerseItemStyle = cva('relative w-full transition duration-500 box-border')

export default function VerseItem({ className, verse, disableBottomSepartor, toolbar }: VerseItemProps)
{
    return (
        <div className={containerVerseItemStyle({ className: disableBottomSepartor ? className : `border-b-[1px] border-b-[#dedede] ${className}` })}>
            {toolbar && (
                <Toolbar
                    className="mb-[10px]"
                    number={toolbar.number}
                    audioButton={toolbar.audioButton}
                    docButton={toolbar.docButton}
                />
            )}
            
            {verse && (
                <>
                    {verse.ar && <p className="w-full text-[#757575] text-[30px] leading-[50px] font-saleem-quran font-normal text-right">{verse.ar}</p>}
                    {verse.id && <p className="w-full text-[#757575] italic py-[15px]">{verse.id}</p>}
                </>
            )}
        </div>
    )
}