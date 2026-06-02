import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useWindowDimensions from './index'

describe('useWindowDimensions', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns initial window dimensions', () => {
        const { result } = renderHook(() => useWindowDimensions())
        expect(result.current.windowWidth).toBe(1024)
        expect(result.current.windowHeight).toBe(768)
    })

    it('updates dimensions after a resize event', () => {
        const { result } = renderHook(() => useWindowDimensions())

        act(() => {
            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
            Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 812 })
            window.dispatchEvent(new Event('resize'))
            vi.advanceTimersByTime(300)
        })

        expect(result.current.windowWidth).toBe(375)
        expect(result.current.windowHeight).toBe(812)
    })

    it('does not update before the debounce delay elapses', () => {
        const { result } = renderHook(() => useWindowDimensions())

        act(() => {
            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
            window.dispatchEvent(new Event('resize'))
            vi.advanceTimersByTime(100)
        })

        expect(result.current.windowWidth).toBe(1024)
    })

    it('removes resize listener and cancels debounce on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
        const { unmount } = renderHook(() => useWindowDimensions())

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
        removeEventListenerSpy.mockRestore()
    })
})
