import type { ComponentType } from 'react'
import type { IconName, SvgIconProps } from './Icon.types'
import { IcArrowUp, IcMenu, IcMugHot } from './items'

export const iconMap: Record<IconName, ComponentType<SvgIconProps>> = {
    'arrow-up': IcArrowUp,
    menu: IcMenu,
    'mug-hot': IcMugHot
}
