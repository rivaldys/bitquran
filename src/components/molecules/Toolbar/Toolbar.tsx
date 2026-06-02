import { cva } from 'class-variance-authority'

export interface ToolbarProps {
    className?: string
    number?: string | number
    audioButton?: {
        isPlaying: boolean
        onToggle: () => void
        title?: string
    }
    docButton?: {
        onClick: () => void
        title?: string
    }
}

const toolbarStyle = cva(
    'flex items-center justify-between bg-[#e0f2f1] rounded-[5px] box-border p-[10px]'
)
const iconButtonStyle = cva(
    'w-[25px] h-[25px] flex justify-center items-center border-none bg-transparent box-border transition duration-500 hover:cursor-pointer hover:opacity-55'
)

export default function Toolbar({ className, number, audioButton, docButton }: ToolbarProps) {
    return (
        <div className={toolbarStyle({ className })}>
            <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#80cbc4] rounded-full text-white text-sm leading-[21px]">
                {number}
            </div>

            {(audioButton || docButton) && (
                <div className="flex items-center">
                    {audioButton && (
                        <button
                            className={iconButtonStyle({ className: 'mr-[5px]' })}
                            onClick={audioButton.onToggle}
                            title={audioButton.title ?? 'Audio Ayat/Murottal'}
                            aria-label={audioButton.isPlaying ? 'Jeda audio' : 'Putar audio'}
                        >
                            {audioButton.isPlaying ? (
                                <svg
                                    aria-hidden="true"
                                    className="h-[18px] fill-[#80cbc4]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" />
                                </svg>
                            ) : (
                                <svg
                                    aria-hidden="true"
                                    className="h-[18px] fill-[#80cbc4]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                </svg>
                            )}
                        </button>
                    )}

                    {docButton && (
                        <button
                            className={iconButtonStyle()}
                            onClick={docButton.onClick}
                            title={docButton.title ?? 'Tafsir Ayat'}
                            aria-label="Lihat tafsir"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-[22px] fill-none stroke-[#80cbc4]"
                                viewBox="0 0 512 512"
                            >
                                <rect
                                    x={96}
                                    y={48}
                                    width={320}
                                    height={416}
                                    rx={48}
                                    ry={48}
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                    d="M176 128h160M176 208h160M176 288h80"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
