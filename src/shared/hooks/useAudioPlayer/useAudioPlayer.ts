import { useCallback, useEffect, useRef, useState } from 'react'

const useAudioPlayer = (src: string) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = new Audio(src)
        audioRef.current = audio

        const handleEnded = () => setIsPlaying(false)
        const handlePause = () => setIsPlaying(false)

        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('pause', handlePause)

        return () => {
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('pause', handlePause)
            audio.pause()
            audioRef.current = null
        }
    }, [src])

    const toggle = useCallback(() => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(console.error)
        } else {
            audio.pause()
        }
    }, [])

    return { isPlaying, toggle }
}

export default useAudioPlayer
