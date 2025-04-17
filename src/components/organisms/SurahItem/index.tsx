import { cva } from 'class-variance-authority'
import Link from 'next/link'

export interface SurahItemProps {
    number: string | number
    title: string
    description: string
    label: string
    containerClassName?: string
    className?: string
    href: string
}

const containerSurahItemStyle = cva('w-full flex items-center')
const surahItemStyle = cva('w-[calc(100%-50px)] sm:w-[calc(100%-65px)] h-[70px] sm:h-[85px] flex justify-between items-center px-[20px] sm:px-[25px] rounded-[5px] sm:rounded-[7px] box-border border-b-2 border-b-[#81c784] bg-white shadow-[0_0_10px_rgba(235,235,235,0.8)] [background-size:200%_100%] [background-image:linear-gradient(to_right,_#fff_50%,_#E0F2F1_50%)] transition-all duration-500 hover:[background-position:-100%_0] hover:cursor-pointer')

export default function SurahItem({ number, title, description, label, containerClassName, className, href }: SurahItemProps)
{
    return (
        <div className={containerSurahItemStyle({ className: containerClassName })}>
            <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center fill-[#4caf50] mr-[15px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.84 282.84">
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path d="M141.42,9.9l36.47,36.47,2.05,2.05h54.48V102.9l2.05,2,36.47,36.47-36.47,36.47-2.05,2.05v54.48H179.94l-2.05,2.05-36.47,36.47L105,236.47l-2-2.05H48.42V179.94l-2.05-2.05L9.9,141.42,46.37,105l2.05-2V48.42H102.9l2-2.05L141.42,9.9m0-9.9L100,41.42H41.42V100L0,141.42l41.42,41.42v58.58H100l41.42,41.42,41.42-41.42h58.58V182.84l41.42-41.42L241.42,100V41.42H182.84L141.42,0Z" />
                        </g>
                    </g>
                </svg>
                <p className="absolute text-sm leading-[21px] sm:text-base sm:leading-[23px]">{number}</p>
            </div>

            <Link href={href} className={surahItemStyle({ className })}>
                <div>
                    <p className="text-[rgb(117,117,117)] font-medium text-sm leading-[21px] sm:text-base sm:leading-[23px]">{title}</p>
                    <label className="text-[#999999] font-light text-xs leading-[19px] sm:text-sm sm:leading-[21px]">{description}</label>
                </div>
                <p className="text-[#757575] font-normal text-[26px] sm:text-[28px] font-saleem-quran">{label}</p>
            </Link>
        </div>
    )
}