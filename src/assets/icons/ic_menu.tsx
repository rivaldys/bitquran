import type { IconProps } from 'bitquran/shared/types'

export default function IcMenu({ className, size, color }: IconProps)
{
    return (
        <svg
            className={className}
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            stroke={color}
        >
            <path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"></path>
        </svg>
    )
}
