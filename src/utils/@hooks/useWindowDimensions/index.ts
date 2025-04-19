import { debounce } from 'bitquran/utils'
import { useEffect, useState } from 'react'

interface WindowDimensions {
    windowWidth: number
    windowHeight: number
}

const getWindowDimensions = (): WindowDimensions =>
{
    if(typeof window === 'undefined')
    {
        return { windowWidth: 0, windowHeight: 0 }
    }

    const { innerWidth: windowWidth, innerHeight: windowHeight } = window

    return {
        windowWidth,
        windowHeight
    }
}

const useWindowDimensions = (): WindowDimensions =>
{
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions())

    useEffect(() =>
    {
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