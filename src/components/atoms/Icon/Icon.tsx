import { iconMap } from './iconMap'
import type { IconProps } from './Icon.types'

export default function Icon({ name, size, width, height, color = '#999999' }: IconProps) {
    const resolvedWidth = size ?? width ?? 24
    const resolvedHeight = size ?? height ?? 24

    const IconComponent = iconMap[name]
    if (!IconComponent) return null

    return <IconComponent width={resolvedWidth} height={resolvedHeight} color={color} />
}
