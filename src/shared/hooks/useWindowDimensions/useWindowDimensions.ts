import { debounce } from 'bitquran/shared/utils'
import { useEffect, useState } from 'react'

interface WindowDimensions {
    windowWidth: number
    windowHeight: number
}

const getWindowDimensions = (): WindowDimensions => {
    if (typeof window === 'undefined') return { windowWidth: 0, windowHeight: 0 }
    return { windowWidth: window.innerWidth, windowHeight: window.innerHeight }
}

const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions)

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowDimensions(getWindowDimensions())
        }, 300)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            handleResize.cancel()
        }
    }, [])

    return windowDimensions
}

export default useWindowDimensions
