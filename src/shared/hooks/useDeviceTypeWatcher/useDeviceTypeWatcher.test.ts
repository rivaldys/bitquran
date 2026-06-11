import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../useWindowDimensions', () => ({
    default: vi.fn()
}))

import useWindowDimensions from '../useWindowDimensions'
import useDeviceTypeWatcher from './index'

describe('useDeviceTypeWatcher', () => {
    it('returns "desktop" when windowWidth is above the breakpoint', () => {
        vi.mocked(useWindowDimensions).mockReturnValue({ windowWidth: 1024, windowHeight: 768 })
        const { result } = renderHook(() => useDeviceTypeWatcher())
        expect(result.current).toBe('desktop')
    })

    it('returns "mobile" when windowWidth equals the breakpoint (768)', () => {
        vi.mocked(useWindowDimensions).mockReturnValue({ windowWidth: 768, windowHeight: 1024 })
        const { result } = renderHook(() => useDeviceTypeWatcher())
        expect(result.current).toBe('mobile')
    })

    it('returns "mobile" when windowWidth is below the breakpoint', () => {
        vi.mocked(useWindowDimensions).mockReturnValue({ windowWidth: 375, windowHeight: 812 })
        const { result } = renderHook(() => useDeviceTypeWatcher())
        expect(result.current).toBe('mobile')
    })
})
