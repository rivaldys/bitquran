import { useMemo } from 'react'
import useWindowDimensions from '../useWindowDimensions'

const useDeviceTypeWatcher = (): 'desktop' | 'mobile' =>
{
    const dimensions = useWindowDimensions()
    const mobileModeMinWidth = 768

    const deviceType = useMemo(() =>
    {
        if(!dimensions) return 'mobile'
        return dimensions.windowWidth > mobileModeMinWidth ? 'desktop' : 'mobile'
    }, [dimensions, mobileModeMinWidth])

    return deviceType
}

export default useDeviceTypeWatcher