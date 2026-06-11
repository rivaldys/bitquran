export type IconName = 'arrow-up' | 'menu' | 'mug-hot'

export interface SvgIconProps {
    width: number
    height: number
    color: string
}

export interface IconProps {
    name: IconName
    size?: number
    width?: number
    height?: number
    color?: string
}
