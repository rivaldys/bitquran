import { render, screen } from '@testing-library/react'
import Text from './Text'

describe('Text', () => {
    it('renders a paragraph with the given children', () => {
        render(<Text>Bismillah</Text>)
        expect(screen.getByText('Bismillah')).toBeInTheDocument()
    })

    it('renders as a p element', () => {
        const { container } = render(<Text>Content</Text>)
        expect(container.querySelector('p')).toBeInTheDocument()
    })
})
