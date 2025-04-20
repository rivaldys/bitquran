import { useMemo } from 'react'
import useWindowDimensions from '../useWindowDimensions'

const useDeviceTypeWatcher = (): 'desktop' | 'mobile' =>
{
    const { windowWidth } = useWindowDimensions()
    const mobileModeMinWidth = 768

    const deviceType = useMemo(() =>
    {
        if(!windowWidth) return 'desktop'
        return windowWidth > mobileModeMinWidth ? 'desktop' : 'mobile'
    }, [windowWidth, mobileModeMinWidth])

    return deviceType
}

export default useDeviceTypeWatcher