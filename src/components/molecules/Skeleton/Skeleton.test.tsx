import { render } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
    it('renders with the default height of 100', () => {
        const { container } = render(<Skeleton />)
        expect(container.firstChild).toHaveStyle({ height: '100px' })
    })

    it('renders with a custom height', () => {
        const { container } = render(<Skeleton height={250} />)
        expect(container.firstChild).toHaveStyle({ height: '250px' })
    })
})
