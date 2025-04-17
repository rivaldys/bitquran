import { IcArrowUp } from 'bitquran/icons'
import { IconProps } from 'bitquran/types'

export default function Icon({ name, size, color }: IconProps)
{
    const currentSize = size ? size : 24
    const currentColor = color ? color : '#999999'

    if(name === 'arrow-up') return <IcArrowUp size={currentSize} color={currentColor} />

    return <IcArrowUp size={currentSize} color={currentColor} />
}