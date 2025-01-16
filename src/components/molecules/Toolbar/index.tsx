import { cva } from 'class-variance-authority'

export interface ToolbarProps {
    className?: string
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

const toolbarStyle = cva('flex items-center justify-between bg-[#e0f2f1] rounded-[5px] box-border p-[10px]')
const iconButtonSyle = cva('w-[25px] h-[25px] flex justify-center items-center border-none bg-transparent box-border transition duration-500 hover:cursor-pointer hover:opacity-55')

export default function Toolbar({ className, number, audioButton, docButton }: ToolbarProps)
{
    return (
        <div className={toolbarStyle({ className })}>
            <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#80cbc4] rounded-full text-white text-sm leading-[21px]">{number}</div>
            
            {(audioButton || docButton) && (
                <div className="flex items-center">
                    {audioButton && (
                        <>
                            <audio src={audioButton.src} />
                            <button
                                className={iconButtonSyle({ className: 'mr-[5px]' })}
                                data-play="false"
                                onClick={audioButton.onClick}
                                title={audioButton.title}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-[18px] fill-[#80cbc4]"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="play"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                </svg>
                            </button>
                        </>
                    )}
                    
                    {docButton && (
                        <button
                            className={iconButtonSyle({ className: '' })}
                            onClick={docButton.onClick}
                            title={docButton.title}
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