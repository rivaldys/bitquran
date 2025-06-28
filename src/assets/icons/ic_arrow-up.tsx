import { IconProps } from 'bitquran/shared/types'

export default function IcArrowUp({ size, color }: IconProps)
{
    return (
        <svg
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            stroke={color}
        >
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 244l144-144 144 144M256 120v292"></path>
        </svg>
    )
}