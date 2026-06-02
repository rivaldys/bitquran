import { render, screen } from '@testing-library/react'
import SectionTitle from './SectionTitle'

describe('SectionTitle', () => {
    it('renders an h3 with the given text', () => {
        render(<SectionTitle>Tajwid</SectionTitle>)
        expect(screen.getByRole('heading', { level: 3, name: 'Tajwid' })).toBeInTheDocument()
    })
})
