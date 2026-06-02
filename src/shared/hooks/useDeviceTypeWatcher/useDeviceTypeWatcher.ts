import { useMemo } from 'react'
import useWindowDimensions from '../useWindowDimensions'

const MOBILE_BREAKPOINT = 768

const useDeviceTypeWatcher = (): 'desktop' | 'mobile' => {
    const dimensions = useWindowDimensions()

    return useMemo(
        () => (dimensions.windowWidth > MOBILE_BREAKPOINT ? 'desktop' : 'mobile'),
        [dimensions]
    )
}

export default useDeviceTypeWatcher
