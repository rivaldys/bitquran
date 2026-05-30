import { IcArrowUp, IcMenu, IcMugHot } from 'bitquran/icons'
import type { IconProps } from 'bitquran/shared/types'

const iconMap = {
    'arrow-up': IcArrowUp,
    'menu': IcMenu,
    'mug-hot': IcMugHot
} as const

export type IconName = keyof typeof iconMap

export default function Icon({ className, name, size = 24, color = '#999999', variant }: IconProps & { name?: IconName }) {
    const iconName: IconName = (name && iconMap[name]) ? name : 'arrow-up'
    const IconComponent = iconMap[iconName]
    return <IconComponent className={className} size={size} color={color} variant={variant} />
}
