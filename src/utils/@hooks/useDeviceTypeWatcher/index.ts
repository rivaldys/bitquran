import { useMemo } from 'react'
import { useWindowDimensions } from '../useWindowDimensions'

export const useDeviceTypeWatcher = () =>
{
    const { windowWidth } = useWindowDimensions()
    const mobileModeMinWidth = 768

    const deviceType = useMemo(() =>
    {
        return windowWidth > mobileModeMinWidth ? 'desktop' : 'mobile'
    }, [windowWidth, mobileModeMinWidth])

    return deviceType
}