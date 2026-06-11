import { render, screen, act } from '@testing-library/react'
import BackToTop from './BackToTop'

describe('BackToTop', () => {
    it('is hidden on initial render before any scroll', () => {
        render(<BackToTop />)
        expect(screen.getByRole('button', { name: /scroll to top/i })).toHaveClass('opacity-0')
    })

    it('becomes visible after scrolling past half the viewport height', () => {
        render(<BackToTop />)
        act(() => {
            Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 })
            window.dispatchEvent(new Event('scroll'))
        })
        expect(screen.getByRole('button', { name: /scroll to top/i })).toHaveClass('opacity-100')
        Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    })
})
