import { render, screen } from '@testing-library/react'
import TextLabel from './TextLabel'

describe('TextLabel', () => {
    it('renders the given children', () => {
        render(<TextLabel>Nama Surah</TextLabel>)
        expect(screen.getByText('Nama Surah')).toBeInTheDocument()
    })

    it('renders as a label element', () => {
        const { container } = render(<TextLabel>Label</TextLabel>)
        expect(container.querySelector('label')).toBeInTheDocument()
    })
})
