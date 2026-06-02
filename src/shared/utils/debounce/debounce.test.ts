import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import debounce from './index'

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('does not call function immediately', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        expect(fn).not.toHaveBeenCalled()
    })

    it('calls function after the delay', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('calls only once for rapid successive calls', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        debounced()
        debounced()
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('resets the delay on each call', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        vi.advanceTimersByTime(200)
        debounced()
        vi.advanceTimersByTime(200)
        expect(fn).not.toHaveBeenCalled()
        vi.advanceTimersByTime(100)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('passes arguments to the original function', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced('hello', 42)
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledWith('hello', 42)
    })

    it('cancel() prevents pending execution', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        debounced.cancel()
        vi.advanceTimersByTime(300)
        expect(fn).not.toHaveBeenCalled()
    })
})
