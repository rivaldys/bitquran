import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useAudioPlayer from './index'

type MockAudio = {
    play: ReturnType<typeof vi.fn>
    pause: ReturnType<typeof vi.fn>
    paused: boolean
    addEventListener: ReturnType<typeof vi.fn>
    removeEventListener: ReturnType<typeof vi.fn>
}

let mockAudio: MockAudio

function createMockAudio(): MockAudio {
    return {
        play: vi.fn().mockResolvedValue(undefined),
        pause: vi.fn(),
        paused: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
    }
}

beforeEach(() => {
    mockAudio = createMockAudio()
    vi.stubGlobal(
        'Audio',
        vi.fn(function () {
            return mockAudio
        })
    )
})

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('useAudioPlayer', () => {
    it('initialises with isPlaying false', () => {
        const { result } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))
        expect(result.current.isPlaying).toBe(false)
    })

    it('creates an Audio element with the given src', () => {
        renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))
        expect(Audio).toHaveBeenCalledWith('http://example.com/audio.mp3')
    })

    it('registers ended and pause event listeners', () => {
        renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))
        expect(mockAudio.addEventListener).toHaveBeenCalledWith('ended', expect.any(Function))
        expect(mockAudio.addEventListener).toHaveBeenCalledWith('pause', expect.any(Function))
    })

    it('toggle calls play and sets isPlaying to true when paused', async () => {
        const { result } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))

        await act(async () => {
            result.current.toggle()
        })

        expect(mockAudio.play).toHaveBeenCalled()
        expect(result.current.isPlaying).toBe(true)
    })

    it('toggle calls pause when audio is already playing', () => {
        mockAudio.paused = false
        const { result } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))

        act(() => {
            result.current.toggle()
        })

        expect(mockAudio.pause).toHaveBeenCalled()
    })

    it('sets isPlaying to false when the ended event fires', () => {
        let endedHandler: (() => void) | undefined
        mockAudio.addEventListener.mockImplementation((event: string, handler: () => void) => {
            if (event === 'ended') endedHandler = handler
        })

        const { result } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))

        act(() => {
            endedHandler?.()
        })

        expect(result.current.isPlaying).toBe(false)
    })

    it('sets isPlaying to false when the pause event fires', () => {
        let pauseHandler: (() => void) | undefined
        mockAudio.addEventListener.mockImplementation((event: string, handler: () => void) => {
            if (event === 'pause') pauseHandler = handler
        })

        const { result } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))

        act(() => {
            pauseHandler?.()
        })

        expect(result.current.isPlaying).toBe(false)
    })

    it('removes event listeners and pauses audio on unmount', () => {
        const { unmount } = renderHook(() => useAudioPlayer('http://example.com/audio.mp3'))

        unmount()

        expect(mockAudio.removeEventListener).toHaveBeenCalledWith('ended', expect.any(Function))
        expect(mockAudio.removeEventListener).toHaveBeenCalledWith('pause', expect.any(Function))
        expect(mockAudio.pause).toHaveBeenCalled()
    })

    it('re-creates audio when src changes', () => {
        const { rerender } = renderHook(({ src }) => useAudioPlayer(src), {
            initialProps: { src: 'http://example.com/audio1.mp3' }
        })

        rerender({ src: 'http://example.com/audio2.mp3' })

        expect(Audio).toHaveBeenCalledTimes(2)
        expect(Audio).toHaveBeenLastCalledWith('http://example.com/audio2.mp3')
    })
})
