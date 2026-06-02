import type { SvgIconProps } from '../Icon.types'

export default function IcArrowUp({ width, height, color }: SvgIconProps) {
    return (
        <svg
            data-icon="arrow-up"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            stroke={color}
        >
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 244l144-144 144 144M256 120v292"
            />
        </svg>
    )
}
