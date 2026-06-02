import { useEffect, useState } from 'react'
import Icon from '../Icon'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            setIsVisible(Math.round(window.scrollY) >= vh / 2)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className={`fixed bottom-3.75 right-3.75 flex items-center justify-center w-11.25 h-11.25 rounded-[10px] cursor-pointer transition-opacity duration-500 bg-[linear-gradient(150deg,#c5e1a5,#009688)] ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <Icon name="arrow-up" size={18} color="#ffffff" />
        </button>
    )
}
