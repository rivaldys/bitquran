import { useEffect, useState } from 'react'
import Icon from '../Icon'

export default function BackToTop()
{
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () =>
        {
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            const winScroll = Math.round(window.pageYOffset)
            setIsVisible(winScroll >= (vh / 2))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () =>
    {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-[15px] right-[15px] flex items-center justify-center w-[45px] h-[45px] rounded-[10px] transition-opacity duration-500 [background-image:linear-gradient(150deg,_#c5e1a5,_#009688)] ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <Icon name="arrow-up" size={18} color="#ffffff" />
        </button>
    )
}