import { IcArrowUp, IcMenu, IcMugHot } from 'bitquran/icons'
import type { IconProps } from 'bitquran/shared/types'

const iconMap = {
    'arrow-up': IcArrowUp,
    'menu': IcMenu,
    'mug-hot': IcMugHot
} as const

export type IconName = keyof typeof iconMap

export default function Icon({ className, name, size, color, variant }: IconProps)
{
    const currentSize = size ? size : 24
    const currentColor = color ? color : '#999999'

    const fallbackName: IconName = 'arrow-up'
    const iconName = (name && iconMap[name]) ? name : fallbackName

    if(!name || !iconMap[name])
    {
        console.warn(`[Icon] Unknown icon name: "${name}", falling back to "${fallbackName}"`)
    }

    const IconComponent = iconMap[iconName]
    return <IconComponent className={className} size={currentSize} color={currentColor} variant={variant} />
}