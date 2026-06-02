import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Icon from './Icon'

describe('Icon', () => {
    describe('default props', () => {
        it('renders an svg element', () => {
            const { container } = render(<Icon name="arrow-up" />)
            expect(container.querySelector('svg')).not.toBeNull()
        })

        it('applies default size of 24×24', () => {
            const { container } = render(<Icon name="arrow-up" />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('width')).toBe('24')
            expect(svg.getAttribute('height')).toBe('24')
        })

        it('applies default color #999999', () => {
            const { container } = render(<Icon name="arrow-up" />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('stroke')).toBe('#999999')
        })
    })

    describe('size prop', () => {
        it('sets width and height uniformly', () => {
            const { container } = render(<Icon name="arrow-up" size={32} />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('width')).toBe('32')
            expect(svg.getAttribute('height')).toBe('32')
        })

        it('takes priority over width', () => {
            const { container } = render(<Icon name="arrow-up" size={32} width={50} />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('width')).toBe('32')
        })

        it('takes priority over height', () => {
            const { container } = render(<Icon name="arrow-up" size={32} height={50} />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('height')).toBe('32')
        })
    })

    describe('width and height props', () => {
        it('applies explicit non-uniform dimensions', () => {
            const { container } = render(<Icon name="arrow-up" width={50} height={30} />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('width')).toBe('50')
            expect(svg.getAttribute('height')).toBe('30')
        })
    })

    describe('color prop', () => {
        it('applies custom color', () => {
            const { container } = render(<Icon name="arrow-up" color="#FF0000" />)
            const svg = container.querySelector('svg')!
            expect(svg.getAttribute('stroke')).toBe('#FF0000')
        })
    })

    describe('name prop', () => {
        it('renders the correct icon via data-icon attribute', () => {
            const { container } = render(<Icon name="menu" />)
            expect(container.querySelector('svg')?.getAttribute('data-icon')).toBe('menu')
        })

        it('renders all supported icon names', () => {
            const icons = ['arrow-up', 'menu', 'mug-hot'] as const
            icons.forEach(name => {
                const { container } = render(<Icon name={name} />)
                expect(container.querySelector('svg')).not.toBeNull()
            })
        })

        it('returns null for an unknown icon name', () => {
            const { container } = render(<Icon name={'unknown' as never} />)
            expect(container.firstChild).toBeNull()
        })
    })
})
