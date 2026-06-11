import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
    it('renders the current year in the copyright text', () => {
        render(<Footer />)
        const year = new Date().getFullYear()
        expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    })

    it('renders the author link', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: /Ahmad Rivaldy/i })).toBeInTheDocument()
    })

    it('renders a footer landmark', () => {
        render(<Footer />)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
})
