import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import TextLink from './TextLink'

describe('TextLink', () => {
    it('renders a link for an internal path', () => {
        render(
            <MemoryRouter>
                <TextLink to="/surat">Daftar Surat</TextLink>
            </MemoryRouter>
        )
        expect(screen.getByRole('link', { name: 'Daftar Surat' })).toBeInTheDocument()
    })

    it('renders an anchor with the href for an external URL', () => {
        render(
            <MemoryRouter>
                <TextLink to="https://example.com">External</TextLink>
            </MemoryRouter>
        )
        expect(screen.getByRole('link', { name: 'External' })).toHaveAttribute('href', 'https://example.com')
    })

    it('renders an anchor with the href for a mailto link', () => {
        render(
            <MemoryRouter>
                <TextLink to="mailto:hello@example.com">Email</TextLink>
            </MemoryRouter>
        )
        expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:hello@example.com')
    })
})
