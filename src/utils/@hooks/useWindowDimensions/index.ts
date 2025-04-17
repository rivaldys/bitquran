import { useEffect, useState } from 'react'

const getWindowDimensions = () =>
{
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window

    return {
        windowWidth,
        windowHeight
    }
}

export const useWindowDimensions = () =>
{
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() =>
    {
        const handleResize = () => setWindowDimensions(getWindowDimensions())

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}